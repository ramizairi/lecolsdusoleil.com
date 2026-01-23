import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getClientIp, getErrorDetails, parseRequestBody } from "@/lib/api";
import { recordFailedAttempt, getLockStatus, clearFailedAttempts } from "@/lib/auth";
import { ensureAdminSeed, findAdminByEmail, verifyAdminPassword, generateOtp, createAdminOtp } from "@/lib/admin";
import { sendAdminOtpEmail } from "@/lib/mailer";
import { isMailerSoftFail } from "@/lib/env";

const loginSchema = z
  .object({
    email: z.string().trim().email().max(255),
    password: z.string().min(6).max(128),
  })
  .strict();

type ApiResponse =
  | {
      ok: true;
      message: string;
      data: {
        otpRequired: true;
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
  const lockKey = `admin:${email}`;

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
          message: "Email ou mot de passe incorrect.",
        },
      });
    }

    const passwordOk = await verifyAdminPassword(admin, password);
    if (!passwordOk) {
      await recordFailedAttempt(lockKey, ip);
      return res.status(401).json({
        ok: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Email ou mot de passe incorrect.",
        },
      });
    }

    await clearFailedAttempts(lockKey, ip);

    const otp = generateOtp();
    await createAdminOtp(email, otp);
    try {
      await sendAdminOtpEmail({ to: email, otp });
    } catch (error) {
      if (!isMailerSoftFail()) {
        throw error;
      }
      console.error("Admin OTP mail soft-fail", error);
    }

    return res.status(200).json({
      ok: true,
      message: "Code OTP envoye par email.",
      data: {
        otpRequired: true,
      },
    });
  } catch (error) {
    console.error("Admin login error", error);

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
