import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getErrorDetails, parseRequestBody } from "@/lib/api";
import { getSessionUser } from "@/lib/session";
import { hashPassword, verifyPassword } from "@/lib/security";
import { getUsersCollection } from "@/lib/users";

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

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6).max(128),
    newPassword: z.string().min(8).max(128),
    confirmPassword: z.string().min(8).max(128),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "Le nouveau mot de passe doit etre different.",
    path: ["newPassword"],
  })
  .refine((data) => /[A-Z]/.test(data.newPassword), {
    message: "Le mot de passe doit contenir une majuscule.",
    path: ["newPassword"],
  })
  .refine((data) => /[a-z]/.test(data.newPassword), {
    message: "Le mot de passe doit contenir une minuscule.",
    path: ["newPassword"],
  })
  .refine((data) => /[0-9]/.test(data.newPassword), {
    message: "Le mot de passe doit contenir un chiffre.",
    path: ["newPassword"],
  });

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    return res.status(405).json({
      ok: false,
      error: {
        code: "METHOD_NOT_ALLOWED",
        message: "Methode non autorisee.",
      },
    });
  }

  try {
    const user = await getSessionUser(req);

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentification requise.",
        },
      });
    }

    const body = parseRequestBody(req);
    const parsed = passwordSchema.safeParse(body);

    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: {
          code: "INVALID_INPUT",
          message: "Mot de passe invalide.",
          details: parsed.error.errors[0]?.message,
        },
      });
    }

    const { currentPassword, newPassword } = parsed.data;
    const isValid = await verifyPassword(currentPassword, user.passwordHash);

    if (!isValid) {
      return res.status(401).json({
        ok: false,
        error: {
          code: "INVALID_CREDENTIALS",
          message: "Mot de passe actuel incorrect.",
        },
      });
    }

    const users = await getUsersCollection();
    const now = new Date();
    const passwordHash = await hashPassword(newPassword);

    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          passwordHash,
          mustChangePassword: false,
          updatedAt: now,
        },
      },
    );

    return res.status(200).json({
      ok: true,
      message: "Mot de passe mis a jour.",
    });
  } catch (error) {
    console.error("Password update error", error);

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
