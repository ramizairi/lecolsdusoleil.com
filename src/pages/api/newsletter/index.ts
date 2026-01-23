import type { NextApiRequest, NextApiResponse } from "next";

type ApiResponse =
  | {
      ok: true;
      message: string;
      endpoints: Array<{
        path: string;
        method: string;
        description: string;
      }>;
    }
  | {
      ok: false;
      error: {
        code: string;
        message: string;
      };
    };

const handler = (req: NextApiRequest, res: NextApiResponse<ApiResponse>) => {
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

  return res.status(200).json({
    ok: true,
    message: "Newsletter API",
    endpoints: [
      {
        path: "/api/newsletter/subscribe",
        method: "POST",
      description: "Inscrire un email a la newsletter.",
      },
      {
        path: "/api/newsletter/unsubscribe",
        method: "POST",
      description: "Desinscrire un email de la newsletter.",
      },
      {
        path: "/api/newsletter/status?email=you@example.com",
        method: "GET",
      description: "Verifier le statut d'un email.",
      },
    ],
  });
};

export default handler;
