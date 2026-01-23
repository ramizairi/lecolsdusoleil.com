import type { NextApiRequest, NextApiResponse } from "next";
import { getClientIp, getCountryFromRequest, getErrorDetails, parseRequestBody } from "@/lib/api";
import { newsletterSubscribeSchema, subscribeNewsletter } from "@/lib/newsletter";

type ApiResponse =
  | {
      ok: true;
      message: string;
      data: {
        status: "subscribed";
        isNew: boolean;
        reactivated: boolean;
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
  const parsed = newsletterSubscribeSchema.safeParse(body);

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
  const country = getCountryFromRequest(req);

  try {
    const result = await subscribeNewsletter({ email, ip, userAgent, country });

    if (result.isNew) {
      return res.status(201).json({
        ok: true,
        message: "Merci pour votre inscription !",
        data: result,
      });
    }

    if (result.reactivated) {
      return res.status(200).json({
        ok: true,
        message: "Heureux de vous revoir ! Votre inscription est reactivee.",
        data: result,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Vous etes deja inscrit(e).",
      data: result,
    });
  } catch (error) {
    console.error("Newsletter subscribe error", error);

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
