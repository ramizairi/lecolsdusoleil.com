import type { NextApiRequest } from "next";

export const parseRequestBody = (req: NextApiRequest) => {
  if (typeof req.body !== "string") {
    return req.body;
  }

  try {
    return JSON.parse(req.body);
  } catch {
    return null;
  }
};

export const getClientIp = (req: NextApiRequest) => {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    return forwarded.split(",")[0]?.trim() ?? null;
  }

  if (Array.isArray(forwarded)) {
    return forwarded[0] ?? null;
  }

  return req.socket.remoteAddress ?? null;
};

export const getErrorDetails = (error: unknown) => {
  if (process.env.NODE_ENV !== "development") {
    return undefined;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
};

export const getCountryFromRequest = (req: NextApiRequest) => {
  const headerKeys = [
    "x-vercel-ip-country",
    "cf-ipcountry",
    "x-geo-country",
    "x-country-code",
    "x-aws-country",
  ];

  for (const key of headerKeys) {
    const value = req.headers[key];
    const country = Array.isArray(value) ? value[0] : value;
    if (!country) {
      continue;
    }

    const normalized = country.toString().trim().toUpperCase();
    if (!normalized || normalized === "XX") {
      continue;
    }

    return normalized;
  }

  return null;
};
