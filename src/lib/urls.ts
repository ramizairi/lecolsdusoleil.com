import type { NextApiRequest } from "next";
import { getAppUrl } from "@/lib/env";

export const buildLoginUrl = (req: NextApiRequest) => {
  const appUrl = getAppUrl();
  if (appUrl) {
    return `${appUrl.replace(/\/$/, "")}/login`;
  }

  const host = req.headers.host ?? "localhost:3000";
  const protoHeader = req.headers["x-forwarded-proto"];
  const proto = Array.isArray(protoHeader) ? protoHeader[0] : protoHeader;
  const scheme = proto ?? "http";
  return `${scheme}://${host}/login`;
};
