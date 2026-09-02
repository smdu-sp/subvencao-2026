const { cpSync, existsSync, mkdirSync } = require("node:fs");
const { join } = require("node:path");

const root = join(__dirname, "..");
const standalone = join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.error('.next/standalone not found — is "output: standalone" set in next.config.ts?');
  process.exit(1);
}

cpSync(join(root, "public"), join(standalone, "public"), { recursive: true });

mkdirSync(join(standalone, ".next"), { recursive: true });
cpSync(join(root, ".next", "static"), join(standalone, ".next", "static"), { recursive: true });

console.log("Copied public/ and .next/static/ into .next/standalone/");
