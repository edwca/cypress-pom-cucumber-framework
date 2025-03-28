export const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST,
    options: {
      encrypt: false,
      enableArithAbort: true,
    },
  };
  