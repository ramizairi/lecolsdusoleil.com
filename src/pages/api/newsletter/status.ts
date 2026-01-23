import type { NextApiRequest, NextApiResponse } from "next";
import { getErrorDetails } from "@/lib/api";
import { newsletterStatusSchema, getNewsletterStatus } from "@/lib/newsletter";

type ApiResponse =
  | {
      ok: true;
      data: {
        status: "subscribed" | "unsubscribed" | "not_found";
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

  const email = Array.isArray(req.query.email) ? req.query.email[0] : req.query.email;
  const parsed = newsletterStatusSchema.safeParse({ email });

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

  try {
    const result = await getNewsletterStatus(parsed.data.email);

    return res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.error("Newsletter status error", error);

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
