import type { NextApiRequest, NextApiResponse } from "next";
import { getClientIp, getCountryFromRequest, getErrorDetails, parseRequestBody } from "@/lib/api";
import { contactRequestSchema, createAccountFromContact } from "@/lib/contact";
import { sendRendezvousEmail } from "@/lib/mailer";
import { isMailerSoftFail } from "@/lib/env";
import { buildLoginUrl } from "@/lib/urls";

type ApiResponse =
  | {
      ok: true;
      message: string;
      data: {
        userCreated: boolean;
        emailSent: boolean;
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

const getLoginUrl = (req: NextApiRequest) => buildLoginUrl(req);

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
  const parsed = contactRequestSchema.safeParse(body);

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: {
        code: "INVALID_INPUT",
        message: "Informations invalides.",
        details: parsed.error.errors[0]?.message,
      },
    });
  }

  const { name, email, phone, message } = parsed.data;
  const ip = getClientIp(req);
  const userAgent = req.headers["user-agent"] ?? null;
  const country = getCountryFromRequest(req);

  try {
    const result = await createAccountFromContact({
      name,
      email,
      phone,
      message,
      ip,
      userAgent,
      country,
    });

    const loginUrl = getLoginUrl(req);
    let emailSent = false;

    if (result.isNewUser && result.password) {
      try {
        await sendRendezvousEmail({
          to: email,
          name,
          email,
          password: result.password,
          loginUrl,
        });
        emailSent = true;
      } catch (error) {
        emailSent = false;
        if (!isMailerSoftFail()) {
          throw error;
        }
        console.error("Mailer soft-fail", error);
      }
    }

    const responseMessage = result.isNewUser
      ? "Votre demande a ete envoyee. Vous allez recevoir un email de confirmation."
      : "Votre demande a ete envoyee. Si vous avez deja un compte, connectez-vous avec vos identifiants.";

    return res.status(201).json({
      ok: true,
      message: responseMessage,
      data: {
        userCreated: result.isNewUser,
        emailSent,
      },
    });
  } catch (error) {
    console.error("Contact submit error", error);

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
