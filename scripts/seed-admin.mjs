import crypto from "crypto";
import { MongoClient } from "mongodb";
import { promisify } from "util";

const scryptAsync = promisify(crypto.scrypt);

const getEnv = (key) => {
  const value = process.env[key];
  return value && value.trim() ? value.trim() : "";
};

const normalizeEmail = (email) => email.trim().toLowerCase();

const hashPassword = async (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
};

const run = async () => {
  const databaseUrl = getEnv("DATABASE_URL") || getEnv("NEXT_PUBLIC_DATABASE_URL");
  const email = normalizeEmail(getEnv("ADMIN_SEED_EMAIL") || getEnv("NEXT_PUBLIC_ADMIN_SEED_EMAIL"));
  const password = getEnv("ADMIN_SEED_PASSWORD") || getEnv("NEXT_PUBLIC_ADMIN_SEED_PASSWORD");
  const force = (getEnv("ADMIN_SEED_FORCE") || "").toLowerCase() === "true";

  if (!databaseUrl) {
    throw new Error("Missing DATABASE_URL or NEXT_PUBLIC_DATABASE_URL env var.");
  }

  if (!email || !password) {
    throw new Error("Missing ADMIN_SEED_EMAIL or ADMIN_SEED_PASSWORD env vars.");
  }

  const client = new MongoClient(databaseUrl);
  await client.connect();

  try {
    const db = client.db();
    const collection = db.collection("admins");
    await collection.createIndex({ email: 1 }, { unique: true, name: "email_unique" });

    const existing = await collection.findOne({ email });
    const now = new Date();

    if (existing && !force) {
      console.log(`Admin already exists for ${email}. Use ADMIN_SEED_FORCE=true to reset password.`);
      return;
    }

    const passwordHash = await hashPassword(password);

    if (existing) {
      await collection.updateOne(
        { _id: existing._id },
        {
          $set: {
            passwordHash,
            status: "active",
            updatedAt: now,
          },
        },
      );
      console.log(`Admin password updated for ${email}.`);
      return;
    }

    await collection.insertOne({
      email,
      passwordHash,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });

    console.log(`Admin created for ${email}.`);
  } finally {
    await client.close();
  }
};

run().catch((error) => {
  console.error("Admin seed failed:", error);
  process.exitCode = 1;
});
