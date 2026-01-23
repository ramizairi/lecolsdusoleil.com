import crypto from "crypto";

const base64UrlEncode = (value: string) => Buffer.from(value).toString("base64url");
const base64UrlDecode = (value: string) => Buffer.from(value, "base64url").toString("utf8");

export const createJwt = ({
  payload,
  secret,
  expiresInSeconds,
}: {
  payload: Record<string, unknown>;
  secret: string;
  expiresInSeconds: number;
}) => {
  const header = { alg: "HS256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;
  const body = { ...payload, iat, exp };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(body));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto.createHmac("sha256", secret).update(unsignedToken).digest("base64url");

  return `${unsignedToken}.${signature}`;
};

export const verifyJwt = ({ token, secret }: { token: string; secret: string }) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return { valid: false as const };
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = crypto.createHmac("sha256", secret).update(unsignedToken).digest("base64url");

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return { valid: false as const };
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return { valid: false as const };
  }

  try {
    const header = JSON.parse(base64UrlDecode(encodedHeader));
    if (header?.alg !== "HS256") {
      return { valid: false as const };
    }

    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload?.exp && typeof payload.exp === "number" && payload.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false as const };
    }

    return { valid: true as const, payload };
  } catch (error) {
    return { valid: false as const };
  }
};
