/* eslint-disable no-console */
import sql from "mssql";
import { sqlConfig } from "../database";

export async function getCategoriasWeb(): Promise<
  { id: string; nombre: string }[]
> {
  try {
    // IMPORTANTE: Para la consulta especifica en una db debemos especificar
    //  el nombre de la base de datos en la conexión process.env.DB_NAME
    const pool = await sql.connect({
      ...sqlConfig,
      database: `${process.env.DB_NAME}`,
    });
    const result = await pool.request().query(`
      SELECT [wcatb_s_id] AS id, [wcatb_c_nombre] AS nombre
      FROM [dbo].[tb_web_categoria]
    `);
    await pool.close();
    return result.recordset;
  } catch (error) {
    console.info("❌ Error al obtener categorías web:", error);
    throw error;
  }
}
