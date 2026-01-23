import type { Collection } from "mongodb";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";

export const newsletterEmailSchema = z
  .string()
  .trim()
  .email({ message: "Veuillez entrer une adresse email valide" })
  .max(255);

export const newsletterSubscribeSchema = z
  .object({
    email: newsletterEmailSchema,
  })
  .strict();

export const newsletterStatusSchema = z
  .object({
    email: newsletterEmailSchema,
  })
  .strict();

export type NewsletterStatus = "subscribed" | "unsubscribed";

export type NewsletterSubscriber = {
  email: string;
  status: NewsletterStatus;
  country?: string | null;
  createdAt: Date;
  updatedAt: Date;
  unsubscribedAt?: Date | null;
  ip?: string | null;
  userAgent?: string | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _newsletterIndexesReady: boolean | undefined;
}

const getNewsletterCollection = async (): Promise<Collection<NewsletterSubscriber>> => {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection<NewsletterSubscriber>("newsletter_subscribers");

  if (!global._newsletterIndexesReady) {
    await collection.createIndex({ email: 1 }, { unique: true, name: "email_unique" });
    global._newsletterIndexesReady = true;
  }

  return collection;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const subscribeNewsletter = async ({
  email,
  ip,
  userAgent,
  country,
}: {
  email: string;
  ip?: string | null;
  userAgent?: string | null;
  country?: string | null;
}) => {
  const normalizedEmail = normalizeEmail(email);
  const collection = await getNewsletterCollection();
  const now = new Date();
  const existing = await collection.findOne({ email: normalizedEmail });

  if (existing) {
    if (existing.status === "subscribed") {
      return { status: "subscribed" as const, isNew: false, reactivated: false };
    }

    await collection.updateOne(
      { email: normalizedEmail },
      {
        $set: {
          status: "subscribed",
          updatedAt: now,
          unsubscribedAt: null,
          ip: ip ?? existing.ip ?? null,
          userAgent: userAgent ?? existing.userAgent ?? null,
          country: country ?? existing.country ?? null,
        },
      },
    );

    return { status: "subscribed" as const, isNew: false, reactivated: true };
  }

  try {
    await collection.insertOne({
      email: normalizedEmail,
      status: "subscribed",
      createdAt: now,
      updatedAt: now,
      unsubscribedAt: null,
      ip: ip ?? null,
      userAgent: userAgent ?? null,
      country: country ?? null,
    });

    return { status: "subscribed" as const, isNew: true, reactivated: false };
  } catch (error: any) {
    if (error?.code === 11000) {
      return { status: "subscribed" as const, isNew: false, reactivated: false };
    }

    throw error;
  }
};

export const unsubscribeNewsletter = async ({
  email,
  ip,
  userAgent,
}: {
  email: string;
  ip?: string | null;
  userAgent?: string | null;
}) => {
  const normalizedEmail = normalizeEmail(email);
  const collection = await getNewsletterCollection();
  const now = new Date();
  const existing = await collection.findOne({ email: normalizedEmail });

  if (!existing) {
    return { status: "not_found" as const };
  }

  if (existing.status === "unsubscribed") {
    return { status: "unsubscribed" as const, already: true };
  }

  await collection.updateOne(
    { email: normalizedEmail },
    {
      $set: {
        status: "unsubscribed",
        updatedAt: now,
        unsubscribedAt: now,
        ip: ip ?? existing.ip ?? null,
        userAgent: userAgent ?? existing.userAgent ?? null,
      },
    },
  );

  return { status: "unsubscribed" as const, already: false };
};

export const getNewsletterStatus = async (email: string) => {
  const normalizedEmail = normalizeEmail(email);
  const collection = await getNewsletterCollection();
  const existing = await collection.findOne({ email: normalizedEmail });

  if (!existing) {
    return { status: "not_found" as const };
  }

  return { status: existing.status };
};
