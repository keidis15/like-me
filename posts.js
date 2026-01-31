import dotenv from "dotenv";
import { pool } from "./connection.js";

dotenv.config();

const ObtenerPost = async () => {
  const consulta = "SELECT * FROM post";

  try {
    const res = await pool.query(consulta);
    if (res.rowCount === 0) {
      throw new Error("No hay posts disponibles");
    }
    console.log("Posts obtenidos:", res.rows);
    return res.rows;
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    throw error;
  }
};

const agregarPost = async (titulo, url, descripcion, likes) => {
  const consulta =
    "INSERT INTO post (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
  const valores = [titulo, url, descripcion, likes || 0];
  try {
    const res = await pool.query(consulta, valores);
    if (res.rowCount === 0) {
      throw new Error("No se pudo agregar el post");
    }
    console.log("Nuevo post agregado:", res.rows[0]);
    return res.rows[0];
  } catch (error) {
    console.error("Error al agregar el post:", error);
    throw error;
  }
};

const modificarRegistro = async (id, titulo, url, descripcion, likes) => {
  const consulta =
    "UPDATE post SET titulo = $1, img = $2, descripcion = $3, likes = $4 WHERE id = $5 RETURNING *";
  const valores = [titulo, url, descripcion, likes, id];
  try {
    const res = await pool.query(consulta, valores);

    if (res.rowCount === 0) {
      throw new Error(`Post no encontrado`);
    }
    console.log("Registro modificado correctamente:", res.rows[0]);
    return res.rows[0];
  } catch (error) {
    console.error("Error al modificar el registro:", error);
    throw error;
  }
};

const eliminarPost = async (id) => {
  const consulta = "DELETE FROM post WHERE id = $1 RETURNING *";
  const valores = [id];
  try {
    const res = await pool.query(consulta, valores);
    if (res.rowCount === 0) {
      throw new Error("Post no encontrado");
    }
    console.log("Post eliminado correctamente:", res.rows[0]);
    return res.rows[0];
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    throw error;
  }
};

export { ObtenerPost, agregarPost, modificarRegistro, eliminarPost };
