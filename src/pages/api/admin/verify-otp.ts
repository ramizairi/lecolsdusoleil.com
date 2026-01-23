import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getClientIp, getErrorDetails, parseRequestBody } from "@/lib/api";
import { clearFailedAttempts, getLockStatus, recordFailedAttempt } from "@/lib/auth";
import { ensureAdminSeed, findAdminByEmail, updateAdminLogin, verifyAdminOtp } from "@/lib/admin";
import { serializeCookie } from "@/lib/cookies";
import { createJwt } from "@/lib/jwt";
import { getAuthSecret } from "@/lib/auth-secret";

const otpSchema = z
  .object({
    email: z.string().trim().email().max(255),
    otp: z.string().trim().regex(/^[0-9]{4}$/),
  })
  .strict();

const SESSION_TTL_SECONDS = 60 * 60 * 8;

type ApiResponse =
  | {
      ok: true;
      message: string;
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
  const parsed = otpSchema.safeParse(body);

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: {
        code: "INVALID_INPUT",
        message: "Code OTP invalide.",
        details: parsed.error.errors[0]?.message,
      },
    });
  }

  const { email, otp } = parsed.data;
  const ip = getClientIp(req);
  const lockKey = `admin-otp:${email}`;

  try {
    await ensureAdminSeed();

    const lockStatus = await getLockStatus(lockKey, ip);
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

    const admin = await findAdminByEmail(email);
    if (!admin || admin.status !== "active") {
      await recordFailedAttempt(lockKey, ip);
      return res.status(401).json({
        ok: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Code OTP invalide.",
        },
      });
    }

    const otpOk = await verifyAdminOtp(email, otp);
    if (!otpOk) {
      await recordFailedAttempt(lockKey, ip);
      return res.status(401).json({
        ok: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Code OTP invalide.",
        },
      });
    }

    await clearFailedAttempts(lockKey, ip);
    await updateAdminLogin(admin._id);

    const secret = getAuthSecret();
    const token = createJwt({
      payload: {
        sub: admin._id.toString(),
        email: admin.email,
        role: "admin",
      },
      secret,
      expiresInSeconds: SESSION_TTL_SECONDS,
    });

    res.setHeader(
      "Set-Cookie",
      serializeCookie("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_TTL_SECONDS,
      }),
    );

    return res.status(200).json({
      ok: true,
      message: "Connexion admin reussie.",
    });
  } catch (error) {
    console.error("Admin OTP error", error);

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
