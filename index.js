import express from "express";
import cors from "cors";
import {
  ObtenerPost,
  agregarPost,
  modificarRegistro,
  eliminarPost,
} from "./posts.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

app.get("/posts", async (req, res) => {
  try {
    const posts = await ObtenerPost();
    res.json(posts);
  } catch (error) {
    if (error.message) {
      res.status(400).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
});

app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  try {
    const nuevoPost = await agregarPost(titulo, url, descripcion);
    res.status(201).json(nuevoPost);
  } catch (error) {
    if (error.message) {
      res.status(400).json({ mensaje: error.message });
    } else {
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
});

app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, url, descripcion, likes } = req.body;
  try {
    const postModificado = await modificarRegistro(
      id,
      titulo,
      url,
      descripcion,
      likes,
    );
    res.json({ mensaje: postModificado });
  } catch (error) {
    // Si el error fue "No encontrado", devolvemos 404
    if (error.message === "Post no encontrado") {
      return res.status(404).json({ mensaje: error.message });
    }
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postEliminado = await eliminarPost(id);
    res.json({ mensaje: postEliminado });
  } catch (error) {
    // Si el error fue "No encontrado", devolvemos 404
    if (error.message === "Post no encontrado") {
      return res.status(404).json({ mensaje: error.message });
    }
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
});
