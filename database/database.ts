/* eslint-disable no-console */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sql from "mssql";

// Definición compatible con ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables desde el .env correspondiente
dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.CYPRESS_ENV || "qa"}`),
});

// Validar existencia de variables requeridas
["DB_HOST", "DB_USER", "DB_PASSWORD"].forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ La variable de entorno ${envVar} no está definida`);
  }
});

export const sqlConfig: sql.config = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_HOST as string,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
