// database/database.ts
import dotenv from 'dotenv';
import path from 'path';
import sql from 'mssql';

// Carga dinámica de .env según entorno
dotenv.config({ path: path.resolve(__dirname, `../.env.${process.env.CYPRESS_ENV || 'qa'}`) });

// Validación de variables de entorno requeridas
['DB_HOST', 'DB_USER', 'DB_PASSWORD'].forEach((envVar) => {
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
  }
};
