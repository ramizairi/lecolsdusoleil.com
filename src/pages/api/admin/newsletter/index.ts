import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getErrorDetails } from "@/lib/api";
import { getAdminSession } from "@/lib/admin-session";

type SubscriberRow = {
  id: string;
  email: string;
  country: string | null;
  createdAt: string;
};

type ApiResponse =
  | {
      ok: true;
      data: {
        subscribers: SubscriberRow[];
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
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

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const parseNumberParam = (value: string | string[] | undefined, fallback: number) => {
  if (Array.isArray(value)) {
    value = value[0];
  }
  if (!value) {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
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
    const admin = await getAdminSession(req);
    if (!admin) {
      return res.status(401).json({
        ok: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentification requise.",
        },
      });
    }

    const page = Math.max(1, parseNumberParam(req.query.page, 1));
    const pageSize = clamp(parseNumberParam(req.query.pageSize, 10), 10, 50);
    const status =
      req.query.status === "all" ? "all" : "subscribed";

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("newsletter_subscribers");

    const filter = status === "all" ? {} : { status: "subscribed" };
    const total = await collection.countDocuments(filter);
    const totalPages = total === 0 ? 1 : Math.ceil(total / pageSize);

    const subscribers = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return res.status(200).json({
      ok: true,
      data: {
        subscribers: subscribers.map((item) => ({
          id: item._id.toString(),
          email: item.email,
          country: item.country ?? null,
          createdAt: item.createdAt?.toISOString?.() ?? "",
        })),
        page,
        pageSize,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Admin newsletter list error", error);

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
