import crypto from "crypto";

type MailerConfig = {
  from: string;
  user: string;
  pass: string;
  host?: string;
  port?: number;
  secure?: boolean;
  service?: string;
};

const pickEnv = (...keys: string[]) => {
  for (const key of keys) {
    const value = process.env[key];
    if (value !== undefined && value !== "") {
      return value;
    }
  }
  return undefined;
};

const toBoolean = (value: string | undefined, fallback = false) => {
  if (!value) {
    return fallback;
  }
  return value === "true" || value === "1" || value === "yes";
};

const toNumber = (value: string | undefined, fallback: number) => {
  if (!value) {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const required = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
};

export const getDatabaseUrl = () => {
  return required(pickEnv("DATABASE_URL", "NEXT_PUBLIC_DATABASE_URL"), "DATABASE_URL");
};

export const getAppUrl = () => {
  return pickEnv("APP_URL", "NEXT_PUBLIC_APP_URL");
};

export const getMailerConfig = (): MailerConfig => {
  const from =
    pickEnv("MAILER_EMAIL_ID", "NEXT_PUBLIC_MAILER_EMAIL_ID") ??
    pickEnv("MAILER_USERNAME", "NEXT_PUBLIC_MAILER_USERNAME") ??
    "";
  const user = pickEnv("MAILER_USERNAME", "NEXT_PUBLIC_MAILER_USERNAME") ?? from;
  const pass = pickEnv("MAILER_PASSWORD", "NEXT_PUBLIC_MAILER_PASSWORD") ?? "";
  const service = pickEnv("MAILER_SERVICE_PROVIDER", "NEXT_PUBLIC_MAILER_SERVICE_PROVIDER");
  const host = pickEnv("SMTP_HOST", "NEXT_PUBLIC_HOST");
  const port = toNumber(pickEnv("SMTP_PORT", "NEXT_PUBLIC_PORT_SSL"), 465);
  const secure = toBoolean(pickEnv("SMTP_SECURE", "NEXT_PUBLIC_SECURE"), true);

  return {
    from: required(from, "MAILER_EMAIL_ID"),
    user: required(user, "MAILER_USERNAME"),
    pass: required(pass, "MAILER_PASSWORD"),
    host: host || undefined,
    port,
    secure,
    service: service || undefined,
  };
};

export const isMailerSoftFail = () => {
  return toBoolean(pickEnv("MAILER_SOFT_FAIL", "NEXT_PUBLIC_MAILER_SOFT_FAIL"), false);
};

export const getAuthSecret = () => {
  const envSecret = pickEnv("AUTH_SECRET", "NEXTAUTH_SECRET", "NEXT_PUBLIC_AUTH_SECRET");

  if (envSecret) {
    return envSecret;
  }

  if (process.env.NODE_ENV !== "production") {
    if (!global.__DEV_AUTH_SECRET__) {
      global.__DEV_AUTH_SECRET__ = crypto.randomBytes(32).toString("hex");
    }
    return global.__DEV_AUTH_SECRET__ as string;
  }

  throw new Error("Missing AUTH_SECRET env var");
};

declare global {
  // eslint-disable-next-line no-var
  var __DEV_AUTH_SECRET__: string | undefined;
}
