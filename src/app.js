import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/characters.routes.js';
import { config } from 'dotenv';
config();

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = '/api/characters'; // Ruta base para las rutas de personajes

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin === 'http://localhost:3000') {
    cors({
      origin: origin,
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
      credentials: true,
    })(req, res, next);
  }
  else if (origin === 'https://solodle.netlify.app') {
    cors({
      origin: origin,
      methods: ['GET', 'POST'],
      credentials: true,
    })(req, res, next);
  }
  else {
    res.status(403).json({ error: 'Acceso no permitido desde este origen' });
  }
});

app.use(express.json());

app.use(baseUrl, characterRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});