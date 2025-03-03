import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/characters.routes.js';
import { config } from 'dotenv';
config();

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = '/api/characters'; // Ruta base para las rutas de personajes

app.use(cors());
app.use(express.json());

// Usa la ruta base para las rutas de personajes
app.use(baseUrl, characterRoutes);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
