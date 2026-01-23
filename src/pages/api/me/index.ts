import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getErrorDetails } from "@/lib/api";
import { getSessionUser } from "@/lib/session";
import { getDefaultNotifications, getDefaultPreferences } from "@/lib/users";

type ApiResponse =
  | {
      ok: true;
      data: {
        profile: {
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
          address: string;
          birthDate: string | null;
          createdAt: string;
          emailVerified: boolean;
        };
        settings: {
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
        stats: {
          appointmentsTotal: number;
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

const parseName = (name?: string) => {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  const [firstName, ...rest] = parts;
  return {
    firstName: firstName ?? "",
    lastName: rest.join(" "),
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
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

    const nameParts = parseName(user.name);
    const firstName = user.firstName ?? nameParts.firstName;
    const lastName = user.lastName ?? nameParts.lastName;

    const defaultsNotifications = getDefaultNotifications();
    const defaultsPreferences = getDefaultPreferences();

    const notifications = { ...defaultsNotifications, ...(user.notifications ?? {}) };
    const preferences = { ...defaultsPreferences, ...(user.preferences ?? {}) };

    const client = await clientPromise;
    const db = client.db();
    const appointmentsTotal = await db
      .collection("contact_requests")
      .countDocuments({ userId: user._id });

    return res.status(200).json({
      ok: true,
      data: {
        profile: {
          firstName,
          lastName,
          email: user.email,
          phone: user.phone ?? "",
          address: user.address ?? "",
          birthDate: user.birthDate ? user.birthDate.toISOString().slice(0, 10) : null,
          createdAt: user.createdAt.toISOString(),
          emailVerified: Boolean(user.emailVerifiedAt),
        },
        settings: {
          notifications,
          preferences,
        },
        stats: {
          appointmentsTotal,
        },
      },
    });
  } catch (error) {
    console.error("Me fetch error", error);

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
