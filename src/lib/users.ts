import { ObjectId } from "mongodb";
import type { Collection, WithId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export type UserStatus = "active" | "pending" | "disabled";

export type NotificationSettings = {
  email: boolean;
  sms: boolean;
  appointments: boolean;
  promotions: boolean;
};

export type PreferenceSettings = {
  language: "fr" | "en" | "es";
  theme: "light" | "dark" | "system";
};

export type UserAccount = {
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone: string;
  address?: string | null;
  birthDate?: Date | null;
  passwordHash: string;
  status: UserStatus;
  mustChangePassword: boolean;
  emailVerifiedAt?: Date | null;
  notifications?: NotificationSettings;
  preferences?: PreferenceSettings;
  createdAt: Date;
  updatedAt: Date;
  lastContactAt?: Date;
  lastLoginAt?: Date;
  lastLoginIp?: string | null;
  loginCount?: number;
};

declare global {
  // eslint-disable-next-line no-var
  var _userIndexesReady: boolean | undefined;
}

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const getDefaultNotifications = (): NotificationSettings => ({
  email: true,
  sms: false,
  appointments: true,
  promotions: false,
});

export const getDefaultPreferences = (): PreferenceSettings => ({
  language: "fr",
  theme: "light",
});

export const getUsersCollection = async (): Promise<Collection<UserAccount>> => {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection<UserAccount>("users");

  if (!global._userIndexesReady) {
    await collection.createIndex({ email: 1 }, { unique: true, name: "email_unique" });
    global._userIndexesReady = true;
  }

  return collection;
};

export const findUserByEmail = async (email: string): Promise<WithId<UserAccount> | null> => {
  const collection = await getUsersCollection();
  const normalizedEmail = normalizeEmail(email);
  return (await collection.findOne({ email: normalizedEmail })) as WithId<UserAccount> | null;
};

export const findUserById = async (id: string): Promise<WithId<UserAccount> | null> => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const collection = await getUsersCollection();
  return (await collection.findOne({ _id: new ObjectId(id) })) as WithId<UserAccount> | null;
};
