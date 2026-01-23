import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getErrorDetails, parseRequestBody } from "@/lib/api";
import { getSessionUser } from "@/lib/session";
import { getUsersCollection } from "@/lib/users";

type ApiResponse =
  | {
      ok: true;
      message: string;
      data: {
        profile: {
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
          address: string;
          birthDate: string | null;
          createdAt: string;
        };
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

const profileSchema = z
  .object({
    firstName: z.string().trim().min(2).max(80),
    lastName: z.string().trim().min(2).max(80),
    phone: z.string().trim().min(6).max(30),
    address: z.string().trim().max(180).optional(),
    birthDate: z.string().trim().optional(),
  })
  .strict();

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
    const parsed = profileSchema.safeParse(body);

    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: {
          code: "INVALID_INPUT",
          message: "Informations invalides.",
          details: parsed.error.errors[0]?.message,
        },
      });
    }

    const { firstName, lastName, phone, address, birthDate } = parsed.data;
    const fullName = `${firstName} ${lastName}`.trim();
    const birthDateValue = birthDate ? new Date(birthDate) : null;

    if (birthDateValue && Number.isNaN(birthDateValue.getTime())) {
      return res.status(400).json({
        ok: false,
        error: {
          code: "INVALID_INPUT",
          message: "Date de naissance invalide.",
        },
      });
    }

    const users = await getUsersCollection();
    const now = new Date();

    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          firstName,
          lastName,
          name: fullName,
          phone,
          address: address?.trim() ?? "",
          birthDate: birthDateValue,
          updatedAt: now,
        },
      },
    );

    return res.status(200).json({
      ok: true,
      message: "Profil mis a jour.",
      data: {
        profile: {
          firstName,
          lastName,
          email: user.email,
          phone,
          address: address?.trim() ?? "",
          birthDate: birthDateValue ? birthDateValue.toISOString().slice(0, 10) : null,
          createdAt: user.createdAt.toISOString(),
        },
      },
    });
  } catch (error) {
    console.error("Profile update error", error);

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
