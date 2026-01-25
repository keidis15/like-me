import dotenv from "dotenv";
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
 host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  allowExitOnIdle: true //para indixcar que la conexion se cierre cuando no haya actividad
});

export { pool };