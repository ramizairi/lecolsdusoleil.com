import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getErrorDetails } from "@/lib/api";
import { getSessionUser } from "@/lib/session";
import { normalizeAppointmentStatus } from "@/lib/appointments";

export type AppointmentSummary = {
  id: string;
  title: string;
  status: ReturnType<typeof normalizeAppointmentStatus>;
  price: number | null;
  rendezvousDate: string | null;
  tunisDate: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  message: string | null;
};

type ApiResponse =
  | {
      ok: true;
      data: {
        appointments: AppointmentSummary[];
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

    const client = await clientPromise;
    const db = client.db();

    const docs = await db
      .collection("contact_requests")
      .find({ userId: user._id })
      .sort({ createdAt: -1 })
      .toArray();

    const appointments = docs.map((doc) => ({
      id: doc._id.toString(),
      title: doc.message ? "Demande personnalisée" : "Demande de rendez-vous",
      status: normalizeAppointmentStatus(doc.status),
      price: typeof doc.price === "number" ? doc.price : null,
      rendezvousDate: doc.rendezvousDate ? doc.rendezvousDate.toISOString().slice(0, 10) : null,
      tunisDate: doc.tunisDate ? doc.tunisDate.toISOString().slice(0, 10) : null,
      notes: doc.notes ?? null,
      message: doc.message ?? null,
      createdAt: doc.createdAt?.toISOString?.() ?? "",
      updatedAt: doc.updatedAt?.toISOString?.() ?? doc.createdAt?.toISOString?.() ?? "",
    }));

    return res.status(200).json({
      ok: true,
      data: { appointments },
    });
  } catch (error) {
    console.error("Me appointments error", error);

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
