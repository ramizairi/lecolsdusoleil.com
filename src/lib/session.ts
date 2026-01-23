import type { NextApiRequest } from "next";
import { getAuthSecret } from "@/lib/auth-secret";
import { parseCookies } from "@/lib/cookies";
import { verifyJwt } from "@/lib/jwt";
import { findUserById } from "@/lib/users";

export const getSessionUser = async (req: NextApiRequest) => {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.auth_session;

  if (!token) {
    return null;
  }

  const secret = getAuthSecret();
  const verification = verifyJwt({ token, secret });

  if (!verification.valid) {
    return null;
  }

  const sub = (verification.payload as { sub?: string })?.sub;
  if (!sub) {
    return null;
  }

  const user = await findUserById(sub);
  if (!user || user.status !== "active") {
    return null;
  }

  return user;
};
