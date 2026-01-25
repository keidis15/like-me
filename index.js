import express from 'express';
import cors from 'cors';
import { ObtenerPost, agregarPost} from './posts.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

app.get('/posts', async (req, res) => {
  try {
    const posts = await ObtenerPost();
    res.json(posts);
  }
    catch (error) {
    res.status(500).json({ error: 'Error retrieving posts' });
  }
});


app.post("/posts", async (req, res) => {
 const { titulo, url, descripcion} = req.body;
  try {
    const nuevoPost= await agregarPost(titulo, url, descripcion);
    res.status(201).json(nuevoPost);
  } catch (error) {
  console.error("Detalle del error:", error); // Esto aparecerá en tu terminal de VS Code
  res.status(500).json({ error: error.message });
}
});
