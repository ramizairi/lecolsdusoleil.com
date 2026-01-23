import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getClientIp, getErrorDetails, parseRequestBody } from "@/lib/api";
import { clearFailedAttempts, getLockStatus, recordFailedAttempt } from "@/lib/auth";
import { getAuthSecret } from "@/lib/auth-secret";
import { serializeCookie } from "@/lib/cookies";
import { createJwt } from "@/lib/jwt";
import { getDummyPasswordHash, verifyPassword } from "@/lib/security";
import { findUserByEmail, getUsersCollection, normalizeEmail } from "@/lib/users";

const loginSchema = z
  .object({
    email: z.string().trim().email().max(255),
    password: z.string().min(6).max(128),
  })
  .strict();

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;


type ApiResponse =
  | {
      ok: true;
      message: string;
      data: {
        mustChangePassword: boolean;
      };
    }
  | {
      ok: false;
      error: {
        code: string;
        message: string;
        details?: string;
      };
    };

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      ok: false,
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: "Methode non autorisee.",
      },
    });
  }

  const body = parseRequestBody(req);
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: {
        code: "INVALID_INPUT",
        message: "Identifiants invalides.",
        details: parsed.error.errors[0]?.message,
      },
    });
  }

  const { email, password } = parsed.data;
  const ip = getClientIp(req);

  try {
    const lockStatus = await getLockStatus(email, ip);

    if (lockStatus.locked) {
      res.setHeader("Retry-After", lockStatus.retryAfterSeconds.toString());
      return res.status(429).json({
        ok: false,
        error: {
          code: "TOO_MANY_ATTEMPTS",
          message: "Trop de tentatives. Reessayez plus tard.",
        },
      });
    }

    const user = await findUserByEmail(email);
    const hashToVerify = user?.passwordHash ?? (await getDummyPasswordHash());
    const passwordValid = await verifyPassword(password, hashToVerify);
    const isActive = user?.status === "active";

    if (!user || !passwordValid || !isActive) {
      await recordFailedAttempt(email, ip);
      return res.status(401).json({
        ok: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Email ou mot de passe incorrect.",
        },
      });
    }

    await clearFailedAttempts(email, ip);

    const users = await getUsersCollection();
    const now = new Date();
    await users.updateOne(
      { email: normalizeEmail(email) },
      {
        $set: {
          lastLoginAt: now,
          lastLoginIp: ip ?? null,
          updatedAt: now,
        },
        $inc: {
          loginCount: 1,
        },
      },
    );

    const secret = getAuthSecret();
    const token = createJwt({
      payload: {
        sub: user._id.toString(),
        email: user.email,
        name: user.name,
      },
      secret,
      expiresInSeconds: SESSION_TTL_SECONDS,
    });

    res.setHeader(
      "Set-Cookie",
      serializeCookie("auth_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_TTL_SECONDS,
      }),
    );

    return res.status(200).json({
      ok: true,
      message: "Connexion reussie.",
      data: {
        mustChangePassword: user.mustChangePassword,
      },
    });
  } catch (error) {
    console.error("Login error", error);

    return res.status(500).json({
      ok: false,
      error: {
        code: "SERVER_ERROR",
        message: "Une erreur est survenue. Reessayez plus tard.",
        details: getErrorDetails(error),
      },
    });
  }
};

export default handler;
