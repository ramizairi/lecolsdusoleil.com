import type { NextApiRequest } from "next";
import { getAuthSecret } from "@/lib/auth-secret";
import { parseCookies } from "@/lib/cookies";
import { verifyJwt } from "@/lib/jwt";
import { findAdminById } from "@/lib/admin";

export const getAdminSession = async (req: NextApiRequest) => {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.admin_session;

  if (!token) {
    return null;
  }

  const secret = getAuthSecret();
  const verification = verifyJwt({ token, secret });

  if (!verification.valid) {
    return null;
  }

  const payload = verification.payload as { sub?: string; role?: string };
  if (!payload?.sub || payload.role !== "admin") {
    return null;
  }

  const admin = await findAdminById(payload.sub);
  if (!admin || admin.status !== "active") {
    return null;
  }

  return admin;
};
