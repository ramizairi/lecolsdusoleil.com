import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getErrorDetails } from "@/lib/api";
import { getSessionUser } from "@/lib/session";
import { normalizeAppointmentStatus } from "@/lib/appointments";

export type PayResponse =
  | {
      ok: true;
      message: string;
      data: {
        appointmentId: string;
        status: ReturnType<typeof normalizeAppointmentStatus>;
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

const handler = async (req: NextApiRequest, res: NextApiResponse<PayResponse>) => {
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

    const { id } = req.query;
    const appointmentId = Array.isArray(id) ? id[0] : id;

    if (!appointmentId || !ObjectId.isValid(appointmentId)) {
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

    const appointment = await collection.findOne({ _id: new ObjectId(appointmentId), userId: user._id });
    if (!appointment) {
      return res.status(404).json({
        ok: false,
        error: {
          code: "NOT_FOUND",
          message: "Rendez-vous introuvable.",
        },
      });
    }

    const currentStatus = normalizeAppointmentStatus(appointment.status);
    if (currentStatus !== "payement") {
      return res.status(400).json({
        ok: false,
        error: {
          code: "INVALID_STATUS",
          message: "Ce rendez-vous n'est pas en attente de paiement.",
        },
      });
    }

    await collection.updateOne(
      { _id: appointment._id },
      {
        $set: {
          status: "completed",
          updatedAt: new Date(),
        },
      },
    );

    return res.status(200).json({
      ok: true,
      message: "Paiement enregistre.",
      data: {
        appointmentId: appointmentId,
        status: "completed",
      },
    });
  } catch (error) {
    console.error("Payment error", error);

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
