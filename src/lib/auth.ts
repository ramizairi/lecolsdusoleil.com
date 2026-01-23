import type { Collection } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { normalizeEmail } from "@/lib/users";

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 15;
const LOCK_MINUTES = 15;
const TTL_DAYS = 7;

export type AuthAttempt = {
  key: string;
  email: string;
  ip?: string | null;
  failureCount: number;
  firstFailureAt: Date;
  lastFailureAt: Date;
  lockedUntil?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

declare global {
  // eslint-disable-next-line no-var
  var _authIndexesReady: boolean | undefined;
}

const getAuthAttemptsCollection = async (): Promise<Collection<AuthAttempt>> => {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection<AuthAttempt>("auth_attempts");

  if (!global._authIndexesReady) {
    await collection.createIndex({ key: 1 }, { unique: true, name: "key_unique" });
    await collection.createIndex({ updatedAt: 1 }, { expireAfterSeconds: TTL_DAYS * 24 * 60 * 60, name: "ttl" });
    global._authIndexesReady = true;
  }

  return collection;
};

const buildKey = (email: string, ip?: string | null) => {
  const normalizedEmail = normalizeEmail(email);
  const safeIp = ip ?? "unknown";
  return `${normalizedEmail}|${safeIp}`;
};

export const getLockStatus = async (email: string, ip?: string | null) => {
  const collection = await getAuthAttemptsCollection();
  const key = buildKey(email, ip);
  const attempt = await collection.findOne({ key });

  if (!attempt?.lockedUntil) {
    return { locked: false as const };
  }

  if (attempt.lockedUntil.getTime() <= Date.now()) {
    return { locked: false as const };
  }

  const retryAfterSeconds = Math.ceil((attempt.lockedUntil.getTime() - Date.now()) / 1000);
  return { locked: true as const, retryAfterSeconds };
};

export const recordFailedAttempt = async (email: string, ip?: string | null) => {
  const collection = await getAuthAttemptsCollection();
  const key = buildKey(email, ip);
  const now = new Date();
  const existing = await collection.findOne({ key });

  const windowMs = WINDOW_MINUTES * 60 * 1000;
  const windowExpired = existing ? now.getTime() - existing.firstFailureAt.getTime() > windowMs : false;

  const failureCount = existing
    ? windowExpired
      ? 1
      : existing.failureCount + 1
    : 1;

  const firstFailureAt = existing && !windowExpired ? existing.firstFailureAt : now;
  const lockedUntil = failureCount >= MAX_ATTEMPTS ? new Date(now.getTime() + LOCK_MINUTES * 60 * 1000) : null;

  await collection.updateOne(
    { key },
    {
      $set: {
        email: normalizeEmail(email),
        ip: ip ?? null,
        failureCount,
        firstFailureAt,
        lastFailureAt: now,
        lockedUntil,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true },
  );

  return { failureCount, lockedUntil };
};

export const clearFailedAttempts = async (email: string, ip?: string | null) => {
  const collection = await getAuthAttemptsCollection();
  const key = buildKey(email, ip);
  await collection.deleteOne({ key });
};
