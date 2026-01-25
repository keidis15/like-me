import dotenv from "dotenv";
import { pool } from "./connection.js";

dotenv.config();

const ObtenerPost = async () => {
  const consulta = "SELECT * FROM post";

  const res = await pool.query(consulta);
  console.log(res.rows);
  console.log("Consulta realizada correctamente");
  return res.rows;
};

const agregarPost = async (titulo, url, descripcion, likes) => {
  const consulta =
    "INSERT INTO post (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
  const valores = [titulo, url, descripcion, likes || 0];
  const res = await pool.query(consulta, valores);
  console.log("Post agregado correctamente:", res.rows[0]);
  return res.rows[0];
};

export { ObtenerPost, agregarPost };
