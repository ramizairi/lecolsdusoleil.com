import { spawn } from "node:child_process";
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  rmSync,
  symlinkSync,
} from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const nextDir = path.join(rootDir, ".next");
const nextBin = path.join(rootDir, "node_modules", "next", "dist", "bin", "next");

const fallbackCacheDirs = [
  path.join(nextDir, "cache", "webpack", "client-development-fallback"),
  path.join(nextDir, "cache", "webpack", "server-development-fallback"),
];

const serverDir = path.join(nextDir, "server");
const serverChunksDir = path.join(serverDir, "chunks");
const vendorChunksDir = path.join(serverDir, "vendor-chunks");
const chunkVendorChunksDir = path.join(serverChunksDir, "vendor-chunks");

const ensureDir = (dirPath) => {
  mkdirSync(dirPath, { recursive: true });
};

const ensureVendorChunkAlias = () => {
  ensureDir(serverChunksDir);

  try {
    const stat = lstatSync(chunkVendorChunksDir);
    if (stat.isSymbolicLink() || stat.isDirectory()) {
      return;
    }
    rmSync(chunkVendorChunksDir, { recursive: true, force: true });
  } catch {
    // Nothing to replace.
  }

  try {
    symlinkSync("../vendor-chunks", chunkVendorChunksDir, "dir");
  } catch {
    ensureDir(chunkVendorChunksDir);
  }
};

const syncVendorChunkFiles = () => {
  if (!existsSync(vendorChunksDir)) {
    return;
  }

  ensureVendorChunkAlias();

  try {
    const stat = lstatSync(chunkVendorChunksDir);
    if (stat.isSymbolicLink()) {
      return;
    }
  } catch {
    return;
  }

  cpSync(vendorChunksDir, chunkVendorChunksDir, { recursive: true, force: true });
};

const ensureDevArtifacts = () => {
  fallbackCacheDirs.forEach(ensureDir);
  ensureVendorChunkAlias();
  syncVendorChunkFiles();
};

rmSync(nextDir, { recursive: true, force: true });
ensureDevArtifacts();

const child = spawn(
  process.execPath,
  [nextBin, "dev", ...process.argv.slice(2)],
  {
    cwd: rootDir,
    env: process.env,
    stdio: "inherit",
  },
);

const syncInterval = setInterval(() => {
  try {
    ensureDevArtifacts();
  } catch {
    // Keep the dev server alive even if a sync attempt fails.
  }
}, 250);

const shutdown = (signal) => {
  clearInterval(syncInterval);
  if (!child.killed) {
    child.kill(signal);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

child.on("exit", (code, signal) => {
  clearInterval(syncInterval);
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
