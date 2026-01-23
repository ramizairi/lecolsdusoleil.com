import type { NextApiRequest, NextApiResponse } from "next";
import * as XLSX from "xlsx";
import clientPromise from "@/lib/mongodb";
import { getErrorDetails } from "@/lib/api";
import { getAdminSession } from "@/lib/admin-session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

    const status =
      req.query.status === "all" ? "all" : "subscribed";
    const filter = status === "all" ? {} : { status: "subscribed" };

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("newsletter_subscribers");

    const subscribers = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    const rows = subscribers.map((item) => ({
      Date: item.createdAt ? item.createdAt.toISOString().slice(0, 10) : "",
      Email: item.email,
      Pays: item.country ?? "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Newsletter");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    const filename = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Length", buffer.length.toString());

    return res.status(200).send(buffer);
  } catch (error) {
    console.error("Admin newsletter export error", error);

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
