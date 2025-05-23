/* eslint-disable no-console */
// scripts/encrypt-env.ts
import * as fs from "fs";
import * as crypto from "crypto";
import * as path from "path";
import { glob } from "glob";

const algorithm = "aes-256-cbc";
const key = crypto.scryptSync(process.env.ENV_SECRET_KEY || "", "salt", 32);

const envFiles = glob.sync(".env.*", { ignore: ["*.enc"] });

if (!envFiles.length) {
  console.info("❗ No se encontraron archivos .env.* para encriptar.");
  process.exit(0);
}

envFiles.forEach((envPath) => {
  const fullPath = path.resolve(envPath);
  const outputPath = `${fullPath}.enc`;
  const iv = crypto.randomBytes(16);

  const content = fs.readFileSync(fullPath, "utf-8");
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(content, "utf8", "hex");
  encrypted += cipher.final("hex");

  fs.writeFileSync(outputPath, iv.toString("hex") + ":" + encrypted);
  console.info(`✅ Encriptado: ${outputPath}`);
});
