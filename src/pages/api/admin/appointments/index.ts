import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getErrorDetails } from "@/lib/api";
import { getAdminSession } from "@/lib/admin-session";
import { APPOINTMENT_STATUSES, normalizeAppointmentStatus } from "@/lib/appointments";
import type { AppointmentStatus } from "@/lib/appointments";

type AppointmentRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  price: number | null;
  rendezvousDate: string | null;
  tunisDate: string | null;
};

type ApiResponse =
  | {
      ok: true;
      data: {
        appointments: AppointmentRow[];
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

    const client = await clientPromise;
    const db = client.db();

    const status = Array.isArray(req.query.status) ? req.query.status[0] : req.query.status;
    const filter =
      status && APPOINTMENT_STATUSES.includes(status as (typeof APPOINTMENT_STATUSES)[number])
        ? { status }
        : {};

    const docs = await db
      .collection("contact_requests")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    const appointments = docs.map((doc) => ({
      id: doc._id.toString(),
      name: doc.name ?? "",
      email: doc.email ?? "",
      phone: doc.phone ?? "",
      status: normalizeAppointmentStatus(doc.status),
      createdAt: doc.createdAt?.toISOString?.() ?? "",
      updatedAt: doc.updatedAt?.toISOString?.() ?? doc.createdAt?.toISOString?.() ?? "",
      price: typeof doc.price === "number" ? doc.price : null,
      rendezvousDate: doc.rendezvousDate ? doc.rendezvousDate.toISOString().slice(0, 10) : null,
      tunisDate: doc.tunisDate ? doc.tunisDate.toISOString().slice(0, 10) : null,
    }));

    return res.status(200).json({
      ok: true,
      data: { appointments },
    });
  } catch (error) {
    console.error("Admin appointments error", error);

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
