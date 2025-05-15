/* eslint-disable no-console */
// scripts/decrypt-env.ts
import * as fs from "fs";
import * as crypto from "crypto";
import * as path from "path";
import { glob } from "glob";

const algorithm = "aes-256-cbc";
const key = crypto.scryptSync(process.env.ENV_SECRET_KEY || "", "salt", 32);

const encFiles = glob.sync(".env.*.enc");

if (!encFiles.length) {
  console.info("❗ No se encontraron archivos .env.*.enc para desencriptar.");
  process.exit(0);
}

encFiles.forEach((encPath) => {
  const fullPath = path.resolve(encPath);
  const outputPath = fullPath.replace(".enc", "");
  const content = fs.readFileSync(fullPath, "utf-8");
  const [ivHex, encrypted] = content.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  fs.writeFileSync(outputPath, decrypted);
  console.info(`🔓 Desencriptado: ${outputPath}`);
});
