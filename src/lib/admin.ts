import { ObjectId } from "mongodb";
import type { Collection, WithId } from "mongodb";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";
import { hashPassword, verifyPassword } from "@/lib/security";
import { normalizeEmail } from "@/lib/users";

const ADMIN_SEED_EMAIL = process.env.ADMIN_SEED_EMAIL ?? process.env.NEXT_PUBLIC_ADMIN_SEED_EMAIL ?? "";
const ADMIN_SEED_PASSWORD = process.env.ADMIN_SEED_PASSWORD ?? process.env.NEXT_PUBLIC_ADMIN_SEED_PASSWORD ?? "";
const OTP_TTL_MINUTES = 10;

export type AdminAccount = {
  email: string;
  passwordHash: string;
  status: "active" | "disabled";
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
};

export type AdminOtp = {
  email: string;
  otpHash: string;
  createdAt: Date;
  expiresAt: Date;
};

declare global {
  // eslint-disable-next-line no-var
  var _adminIndexesReady: boolean | undefined;
  // eslint-disable-next-line no-var
  var _adminOtpIndexesReady: boolean | undefined;
}

const getAdminsCollection = async (): Promise<Collection<AdminAccount>> => {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection<AdminAccount>("admins");

  if (!global._adminIndexesReady) {
    await collection.createIndex({ email: 1 }, { unique: true, name: "email_unique" });
    global._adminIndexesReady = true;
  }

  return collection;
};

const getAdminOtpCollection = async (): Promise<Collection<AdminOtp>> => {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection<AdminOtp>("admin_otps");

  if (!global._adminOtpIndexesReady) {
    await collection.createIndex({ email: 1 }, { unique: true, name: "email_unique" });
    await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0, name: "expires" });
    global._adminOtpIndexesReady = true;
  }

  return collection;
};

export const ensureAdminSeed = async (): Promise<WithId<AdminAccount> | null> => {
  const seedEmail = normalizeEmail(ADMIN_SEED_EMAIL);
  if (!seedEmail || !ADMIN_SEED_PASSWORD) {
    return null;
  }

  const admins = await getAdminsCollection();
  const existing = await admins.findOne({ email: seedEmail });

  if (existing) {
    return existing;
  }

  const now = new Date();
  const passwordHash = await hashPassword(ADMIN_SEED_PASSWORD);
  const result = await admins.insertOne({
    email: seedEmail,
    passwordHash,
    status: "active",
    createdAt: now,
    updatedAt: now,
  });

  return {
    _id: result.insertedId,
    email: seedEmail,
    passwordHash,
    status: "active" as const,
    createdAt: now,
    updatedAt: now,
  } as WithId<AdminAccount>;
};

export const findAdminByEmail = async (email: string): Promise<WithId<AdminAccount> | null> => {
  const admins = await getAdminsCollection();
  const normalizedEmail = normalizeEmail(email);
  return (await admins.findOne({ email: normalizedEmail })) as WithId<AdminAccount> | null;
};

export const findAdminById = async (id: string): Promise<WithId<AdminAccount> | null> => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const admins = await getAdminsCollection();
  return (await admins.findOne({ _id: new ObjectId(id) })) as WithId<AdminAccount> | null;
};

export const verifyAdminPassword = async (admin: WithId<AdminAccount>, password: string) => {
  return verifyPassword(password, admin.passwordHash);
};

export const generateOtp = () => {
  const value = crypto.randomInt(0, 10000).toString().padStart(4, "0");
  return value;
};

export const createAdminOtp = async (email: string, otp: string) => {
  const collection = await getAdminOtpCollection();
  const now = new Date();
  const otpHash = await hashPassword(otp);
  const expiresAt = new Date(now.getTime() + OTP_TTL_MINUTES * 60 * 1000);

  await collection.updateOne(
    { email: normalizeEmail(email) },
    {
      $set: {
        email: normalizeEmail(email),
        otpHash,
        createdAt: now,
        expiresAt,
      },
    },
    { upsert: true },
  );
};

export const verifyAdminOtp = async (email: string, otp: string) => {
  const collection = await getAdminOtpCollection();
  const record = await collection.findOne({ email: normalizeEmail(email) });

  if (!record) {
    return false;
  }

  if (record.expiresAt.getTime() <= Date.now()) {
    return false;
  }

  const isValid = await verifyPassword(otp, record.otpHash);
  if (isValid) {
    await collection.deleteOne({ email: normalizeEmail(email) });
  }

  return isValid;
};

export const updateAdminLogin = async (adminId: ObjectId) => {
  const admins = await getAdminsCollection();
  const now = new Date();
  await admins.updateOne(
    { _id: adminId },
    {
      $set: {
        lastLoginAt: now,
        updatedAt: now,
      },
    },
  );
};
