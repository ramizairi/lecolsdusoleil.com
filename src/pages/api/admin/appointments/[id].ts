import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { getErrorDetails, parseRequestBody } from "@/lib/api";
import { getAdminSession } from "@/lib/admin-session";
import { sendAppointmentStatusEmail } from "@/lib/mailer";
import { isMailerSoftFail } from "@/lib/env";
import { APPOINTMENT_STATUSES, normalizeAppointmentStatus } from "@/lib/appointments";
import type { AppointmentStatus } from "@/lib/appointments";
import { buildLoginUrl } from "@/lib/urls";

const updateSchema = z
  .object({
    status: z.enum(APPOINTMENT_STATUSES).optional(),
    price: z.number().min(0).optional().nullable(),
    notes: z.string().trim().max(2000).optional().nullable(),
    rendezvousDate: z.string().trim().optional().nullable(),
    tunisDate: z.string().trim().optional().nullable(),
  })
  .strict();

type ApiResponse =
  | {
      ok: true;
      data: {
        appointment: {
          id: string;
          name: string;
          email: string;
          phone: string;
          message: string | null;
          status: AppointmentStatus;
          price: number | null;
          notes: string | null;
          rendezvousDate: string | null;
          tunisDate: string | null;
          createdAt: string;
          updatedAt: string;
        };
      };
      message?: string;
    }
  | {
      ok: false;
      error: {
        code: string;
        message: string;
        details?: string;
      };
    };

const getLoginUrl = (req: NextApiRequest) => buildLoginUrl(req);

const normalizeDate = (value?: string | null) => {
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
  res.setHeader("Cache-Control", "no-store");

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

    const { id } = req.query;
    const appointmentId = Array.isArray(id) ? id[0] : id;

    if (!appointmentId) {
      return res.status(400).json({
        ok: false,
        error: {
          code: "INVALID_INPUT",
          message: "Identifiant invalide.",
        },
      });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("contact_requests");

    if (!ObjectId.isValid(appointmentId)) {
      return res.status(400).json({
        ok: false,
        error: {
          code: "INVALID_INPUT",
          message: "Identifiant invalide.",
        },
      });
    }

    const appointment = await collection.findOne({ _id: new ObjectId(appointmentId) });
    if (!appointment) {
      return res.status(404).json({
        ok: false,
        error: {
          code: "NOT_FOUND",
          message: "Dossier introuvable.",
        },
      });
    }

    if (req.method === "GET") {
      return res.status(200).json({
        ok: true,
        data: {
          appointment: {
            id: appointment._id.toString(),
            name: appointment.name ?? "",
            email: appointment.email ?? "",
            phone: appointment.phone ?? "",
            message: appointment.message ?? null,
            status: normalizeAppointmentStatus(appointment.status),
            price: typeof appointment.price === "number" ? appointment.price : null,
            notes: appointment.notes ?? null,
            rendezvousDate: appointment.rendezvousDate ? appointment.rendezvousDate.toISOString().slice(0, 10) : null,
            tunisDate: appointment.tunisDate ? appointment.tunisDate.toISOString().slice(0, 10) : null,
            createdAt: appointment.createdAt?.toISOString?.() ?? "",
            updatedAt: appointment.updatedAt?.toISOString?.() ?? appointment.createdAt?.toISOString?.() ?? "",
          },
        },
      });
    }

    if (req.method !== "PUT") {
      res.setHeader("Allow", "GET, PUT");
      return res.status(405).json({
        ok: false,
        error: {
          code: "METHOD_NOT_ALLOWED",
          message: "Methode non autorisee.",
        },
      });
    }

    const body = parseRequestBody(req);
    const parsed = updateSchema.safeParse(body);

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

    const updates: Record<string, unknown> = {};

    if (parsed.data.status) {
      updates.status = parsed.data.status;
    }

    if (parsed.data.notes !== undefined) {
      updates.notes = parsed.data.notes ? parsed.data.notes.trim() : null;
    }

    if (parsed.data.price !== undefined) {
      updates.price = parsed.data.price ?? null;
    }

    if (parsed.data.rendezvousDate !== undefined) {
      const dateValue = normalizeDate(parsed.data.rendezvousDate);
      if (parsed.data.rendezvousDate && !dateValue) {
        return res.status(400).json({
          ok: false,
          error: {
            code: "INVALID_INPUT",
            message: "Date de rendez-vous invalide.",
          },
        });
      }
      updates.rendezvousDate = dateValue;
    }

    if (parsed.data.tunisDate !== undefined) {
      const dateValue = normalizeDate(parsed.data.tunisDate);
      if (parsed.data.tunisDate && !dateValue) {
        return res.status(400).json({
          ok: false,
          error: {
            code: "INVALID_INPUT",
            message: "Date Tunisie invalide.",
          },
        });
      }
      updates.tunisDate = dateValue;
    }

    updates.updatedAt = new Date();

    if (Object.keys(updates).length > 0) {
      await collection.updateOne({ _id: appointment._id }, { $set: updates });
    }

    const refreshed = await collection.findOne({ _id: appointment._id });
    if (!refreshed) {
      throw new Error("Missing appointment after update");
    }

    const statusChanged = parsed.data.status && parsed.data.status !== appointment.status;
    if (statusChanged) {
      const loginUrl = getLoginUrl(req);
      try {
        await sendAppointmentStatusEmail({
          to: refreshed.email,
          name: refreshed.name ?? "",
          status: normalizeAppointmentStatus(refreshed.status),
          price: typeof refreshed.price === "number" ? refreshed.price : null,
          rendezvousDate: refreshed.rendezvousDate ? refreshed.rendezvousDate.toISOString().slice(0, 10) : null,
          tunisDate: refreshed.tunisDate ? refreshed.tunisDate.toISOString().slice(0, 10) : null,
          notes: refreshed.notes ?? null,
          loginUrl,
        });
      } catch (error) {
        if (!isMailerSoftFail()) {
          throw error;
        }
        console.error("Appointment mail soft-fail", error);
      }
    }

    return res.status(200).json({
      ok: true,
      message: "Dossier mis a jour.",
      data: {
        appointment: {
          id: refreshed._id.toString(),
          name: refreshed.name ?? "",
          email: refreshed.email ?? "",
          phone: refreshed.phone ?? "",
          message: refreshed.message ?? null,
          status: normalizeAppointmentStatus(refreshed.status),
          price: typeof refreshed.price === "number" ? refreshed.price : null,
          notes: refreshed.notes ?? null,
          rendezvousDate: refreshed.rendezvousDate ? refreshed.rendezvousDate.toISOString().slice(0, 10) : null,
          tunisDate: refreshed.tunisDate ? refreshed.tunisDate.toISOString().slice(0, 10) : null,
          createdAt: refreshed.createdAt?.toISOString?.() ?? "",
          updatedAt: refreshed.updatedAt?.toISOString?.() ?? refreshed.createdAt?.toISOString?.() ?? "",
        },
      },
    });
  } catch (error) {
    console.error("Admin appointment update error", error);

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
