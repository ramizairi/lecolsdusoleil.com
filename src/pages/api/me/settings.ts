import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getErrorDetails, parseRequestBody } from "@/lib/api";
import { getSessionUser } from "@/lib/session";
import { getDefaultNotifications, getDefaultPreferences, getUsersCollection } from "@/lib/users";

type ApiResponse =
  | {
      ok: true;
      message: string;
      data: {
        notifications: {
          email: boolean;
          sms: boolean;
          appointments: boolean;
          promotions: boolean;
        };
        preferences: {
          language: "fr" | "en" | "es";
          theme: "light" | "dark" | "system";
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

const settingsSchema = z
  .object({
    notifications: z
      .object({
        email: z.boolean(),
        sms: z.boolean(),
        appointments: z.boolean(),
        promotions: z.boolean(),
      })
      .strict(),
    preferences: z
      .object({
        language: z.enum(["fr", "en", "es"]),
        theme: z.enum(["light", "dark", "system"]),
      })
      .strict(),
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
    const parsed = settingsSchema.safeParse(body);

    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: {
          code: "INVALID_INPUT",
          message: "Parametres invalides.",
          details: parsed.error.errors[0]?.message,
        },
      });
    }

    const defaultsNotifications = getDefaultNotifications();
    const defaultsPreferences = getDefaultPreferences();

    const notifications = { ...defaultsNotifications, ...parsed.data.notifications };
    const preferences = { ...defaultsPreferences, ...parsed.data.preferences };

    const users = await getUsersCollection();
    const now = new Date();

    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          notifications,
          preferences,
          updatedAt: now,
        },
      },
    );

    return res.status(200).json({
      ok: true,
      message: "Parametres mis a jour.",
      data: {
        notifications,
        preferences,
      },
    });
  } catch (error) {
    console.error("Settings update error", error);

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
