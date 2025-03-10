import express from 'express';
import corsMiddleware from './middlewares/corsMiddleware.js';
import characterRoutes from './routes/characters.routes.js';
import { config } from 'dotenv';
config();

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = '/api/characters'; // Ruta base para las rutas de personajes

app.use(corsMiddleware);

app.options('*', (req, res) => {
  const origin = req.headers.origin;

  if (origin === 'http://localhost:5173') {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.send();
  } else if (origin === 'https://solodle.netlify.app') {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.send();
  } else {
    res.status(403).json({ error: 'Acceso no permitido desde este origen' });
  }
});

app.use(express.json());

app.use(baseUrl, characterRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});