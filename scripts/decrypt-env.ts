/* eslint-disable no-console */
import { createDecipheriv, scryptSync } from 'crypto';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { config } from 'dotenv';
import path from 'path';

const envFiles = ['.env.qa', '.env.devel', '.env.regresion'];

envFiles.forEach((envFile) => {
  const envPath = path.resolve(envFile);
  const encPath = `${envPath}.enc`;

  if (!existsSync(encPath)) {
    console.warn(`⚠️ No se encontró el archivo encriptado: ${encPath}, se omite`);
    return;
  }

  // Carga ENV_SECRET_KEY desde el archivo original si existe
  if (existsSync(envPath)) {
    config({ path: envPath });
  }

  const password = process.env.ENV_SECRET_KEY;

  if (!password) {
    console.error(`❌ ENV_SECRET_KEY no está definido para ${envFile}.`);
    return;
  }

  try {
    const key = scryptSync(password, 'salt', 32);
    const file = readFileSync(encPath);
    const iv = file.subarray(0, 16);
    const encrypted = file.subarray(16);

    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

    writeFileSync(envPath, decrypted);
    console.log(`✅ ${envFile} desencriptado correctamente`);
  } catch (err) {
    console.error(`❌ Error al desencriptar ${envFile}. Clave incorrecta o archivo corrupto.`);
  }
});

