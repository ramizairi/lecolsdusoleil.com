import crypto from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(crypto.scrypt);

const PASSWORD_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#";
const PASSWORD_LENGTH = 10;
const DUMMY_PASSWORD = "invalid-password";

let dummyHashPromise: Promise<string> | null = null;

const pickChar = (buffer: Buffer, index: number) => {
  const byte = buffer[index % buffer.length];
  return PASSWORD_ALPHABET[byte % PASSWORD_ALPHABET.length];
};

export const generatePassword = (length: number = PASSWORD_LENGTH) => {
  let password = "";

  while (password.length < length) {
    const bytes = crypto.randomBytes(length);
    password = Array.from({ length }, (_, i) => pickChar(bytes, i)).join("");

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);

    if (hasUpper && hasLower && hasDigit) {
      break;
    }
  }

  return password;
};

export const hashPassword = async (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
};

export const getDummyPasswordHash = async () => {
  if (!dummyHashPromise) {
    dummyHashPromise = hashPassword(DUMMY_PASSWORD);
  }
  return dummyHashPromise;
};

export const verifyPassword = async (password: string, storedHash: string) => {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) {
    return false;
  }

  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  const storedKey = Buffer.from(key, "hex");

  if (storedKey.length !== derivedKey.length) {
    return false;
  }

  return crypto.timingSafeEqual(storedKey, derivedKey);
};
