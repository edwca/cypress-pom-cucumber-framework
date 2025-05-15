/* eslint-disable no-console */
// // scripts/encrypt-env.ts
// import * as fs from "fs";
// import * as crypto from "crypto";
// import * as path from "path";
// import { glob } from "glob";

// const algorithm = "aes-256-cbc";
// const key = crypto.scryptSync(process.env.ENV_SECRET_KEY || "", "salt", 32);

// const envFiles = glob.sync(".env.*", { ignore: ["*.enc"] });

// if (!envFiles.length) {
//   console.info("❗ No se encontraron archivos .env.* para encriptar.");
//   process.exit(0);
// }

// envFiles.forEach((envPath) => {
//   const fullPath = path.resolve(envPath);
//   const outputPath = `${fullPath}.enc`;
//   const iv = crypto.randomBytes(16);

//   const content = fs.readFileSync(fullPath, "utf-8");
//   const cipher = crypto.createCipheriv(algorithm, key, iv);
//   let encrypted = cipher.update(content, "utf8", "hex");
//   encrypted += cipher.final("hex");

//   fs.writeFileSync(outputPath, iv.toString("hex") + ":" + encrypted);
//   console.info(`✅ Encriptado: ${outputPath}`);
// });
import { createCipheriv, randomBytes, scryptSync } from 'crypto';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { config } from 'dotenv';
import path from 'path';

const envFiles = ['.env.qa', '.env.devel', '.env.regresion'];

envFiles.forEach((envFile) => {
  const envPath = path.resolve(envFile);
  if (!existsSync(envPath)) {
    console.warn(`⚠️ No se encontró el archivo: ${envFile}, se omite`);
    return;
  }

  config({ path: envPath });

  const password = process.env.ENV_SECRET_KEY;

  if (!password) {
    console.error(`❌ ENV_SECRET_KEY no está definido en ${envFile} ni como variable de entorno.`);
    return;
  }

  const key = scryptSync(password, 'salt', 32);
  const iv = randomBytes(16);

  const cipher = createCipheriv('aes-256-cbc', key, iv);
  const input = readFileSync(envPath, 'utf8');
  const encrypted = Buffer.concat([cipher.update(input, 'utf8'), cipher.final()]);

  const combined = Buffer.concat([iv, encrypted]);
  writeFileSync(`${envPath}.enc`, combined);

  console.log(`✅ ${envFile} encriptado como ${envFile}.enc`);
});


