/* eslint-disable no-console */
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


