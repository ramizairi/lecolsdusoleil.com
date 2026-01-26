import type { Collection, ObjectId } from "mongodb";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import type { AppointmentStatus } from "@/lib/appointments";
import {
  findUserByEmail,
  getDefaultNotifications,
  getDefaultPreferences,
  getUsersCollection,
  normalizeEmail,
} from "@/lib/users";
import { generatePassword, hashPassword } from "@/lib/security";

export const contactRequestSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().min(6).max(30),
    message: z.string().trim().max(1200).optional(),
  })
  .strict();

export type ContactRequest = {
  name: string;
  email: string;
  phone: string;
  message?: string | null;
  createdAt: Date;
  updatedAt: Date;
  status: AppointmentStatus;
  price?: number | null;
  notes?: string | null;
  rendezvousDate?: Date | null;
  tunisDate?: Date | null;
  userId?: ObjectId;
  ip?: string | null;
  userAgent?: string | null;
  country?: string | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _contactIndexesReady: boolean | undefined;
}

const getContactCollection = async (): Promise<Collection<ContactRequest>> => {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection<ContactRequest>("contact_requests");

  if (!global._contactIndexesReady) {
    await collection.createIndex({ createdAt: -1 }, { name: "created_at_desc" });
    await collection.createIndex({ email: 1 }, { name: "email_lookup" });
    global._contactIndexesReady = true;
  }

  return collection;
};

const splitName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const [firstName, ...rest] = parts;
  const lastName = rest.join(" ");
  return {
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    fullName: [firstName, lastName].filter(Boolean).join(" ").trim(),
  };
};

export const createAccountFromContact = async ({
  name,
  email,
  phone,
  message,
  ip,
  userAgent,
  country,
}: {
  name: string;
  email: string;
  phone: string;
  message?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  country?: string | null;
}) => {
  const normalizedEmail = normalizeEmail(email);
  const now = new Date();
  const users = await getUsersCollection();
  const contacts = await getContactCollection();
  const nameParts = splitName(name);

  const existingUser = await findUserByEmail(normalizedEmail);

  let userId: ObjectId;
  let isNewUser = false;
  let password: string | null = null;

  if (existingUser) {
    await users.updateOne(
      { email: normalizedEmail },
      {
        $set: {
          name: nameParts.fullName || name,
          firstName: nameParts.firstName || existingUser.firstName,
          lastName: nameParts.lastName || existingUser.lastName,
          phone,
          updatedAt: now,
          lastContactAt: now,
        },
      },
    );

    userId = existingUser._id;
  } else {
    password = generatePassword();
    const passwordHash = await hashPassword(password);
    const result = await users.insertOne({
      email: normalizedEmail,
      name: nameParts.fullName || name,
      firstName: nameParts.firstName || "",
      lastName: nameParts.lastName || "",
      phone,
      passwordHash,
      status: "active",
      mustChangePassword: true,
      notifications: getDefaultNotifications(),
      preferences: getDefaultPreferences(),
      emailVerifiedAt: null,
      createdAt: now,
      updatedAt: now,
      lastContactAt: now,
    });

    userId = result.insertedId;
    isNewUser = true;
  }

  const cleanMessage = message?.trim();
  const contactResult = await contacts.insertOne({
    name,
    email: normalizedEmail,
    phone,
    message: cleanMessage ? cleanMessage : null,
    createdAt: now,
    updatedAt: now,
    status: "new",
    price: null,
    notes: null,
    rendezvousDate: null,
    tunisDate: null,
    userId,
    ip: ip ?? null,
    userAgent: userAgent ?? null,
    country: country ?? null,
  });

  return {
    userId,
    contactId: contactResult.insertedId,
    isNewUser,
    password,
  };
};
