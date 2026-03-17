import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { parseRequestBody } from "@/lib/api";
import { isMailerSoftFail } from "@/lib/env";
import { sendPasswordResetEmail } from "@/lib/mailer";
import { generatePassword, hashPassword } from "@/lib/security";
import { findUserByEmail, getUsersCollection } from "@/lib/users";
import { buildLoginUrl } from "@/lib/urls";

const forgotPasswordSchema = z
  .object({
    email: z.string().trim().email().max(255),
  })
  .strict();

const SUCCESS_MESSAGE = "Si un compte existe, un email avec un mot de passe temporaire a ete envoye.";

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
  const parsed = forgotPasswordSchema.safeParse(body);

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: {
        code: "INVALID_INPUT",
        message: "Email invalide.",
        details: parsed.error.errors[0]?.message,
      },
    });
  }

  const { email } = parsed.data;

  try {
    const user = await findUserByEmail(email);

    // Avoid account enumeration by returning the same message in all user-not-found scenarios.
    if (!user || user.status !== "active") {
      return res.status(200).json({
        ok: true,
        message: SUCCESS_MESSAGE,
      });
    }

    const previousPasswordHash = user.passwordHash;
    const previousMustChangePassword = user.mustChangePassword;
    const temporaryPassword = generatePassword();
    const nextPasswordHash = await hashPassword(temporaryPassword);
    const users = await getUsersCollection();
    const now = new Date();

    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          passwordHash: nextPasswordHash,
          mustChangePassword: true,
          updatedAt: now,
        },
      },
    );

    try {
      await sendPasswordResetEmail({
        to: user.email,
        name: user.firstName || user.name || "Client",
        email: user.email,
        password: temporaryPassword,
        loginUrl: buildLoginUrl(req),
      });
    } catch (error) {
      // Roll back the generated password if the email could not be delivered.
      try {
        await users.updateOne(
          { _id: user._id },
          {
            $set: {
              passwordHash: previousPasswordHash,
              mustChangePassword: previousMustChangePassword,
              updatedAt: new Date(),
            },
          },
        );
      } catch (rollbackError) {
        console.error("Forgot password rollback error", rollbackError);
      }

      if (!isMailerSoftFail()) {
        throw error;
      }

      console.error("Forgot password mail soft-fail", error);
    }

    return res.status(200).json({
      ok: true,
      message: SUCCESS_MESSAGE,
    });
  } catch (error) {
    console.error("Forgot password error", error);

    return res.status(200).json({
      ok: true,
      message: SUCCESS_MESSAGE,
    });
  }
};

export default handler;
