import type { NextApiRequest, NextApiResponse } from "next";
import { getClientIp, getErrorDetails, parseRequestBody } from "@/lib/api";
import { newsletterStatusSchema, unsubscribeNewsletter } from "@/lib/newsletter";

type ApiResponse =
  | {
      ok: true;
      message: string;
      data: {
        status: "unsubscribed" | "not_found";
        already?: boolean;
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
  const parsed = newsletterStatusSchema.safeParse(body);

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
  const ip = getClientIp(req);
  const userAgent = req.headers["user-agent"] ?? null;

  try {
    const result = await unsubscribeNewsletter({ email, ip, userAgent });

    if (result.status === "not_found") {
      return res.status(200).json({
        ok: true,
        message: "Aucun abonnement actif pour cet email.",
        data: result,
      });
    }

    if (result.already) {
      return res.status(200).json({
        ok: true,
        message: "Vous etes deja desinscrit(e).",
        data: result,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Desinscription confirmee.",
      data: result,
    });
  } catch (error) {
    console.error("Newsletter unsubscribe error", error);

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
