import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/characters.routes.js';
import { config } from 'dotenv';
config();

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = '/api/characters'; // Ruta base para las rutas de personajes

// Middleware para configurar CORS dinámicamente
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Permite todos los métodos para localhost
  if (origin === 'http://localhost:3000') {
    cors({
      origin: origin,
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Todos los métodos
      credentials: true,
    })(req, res, next);
  }
  // Permite solo GET y POST para Netlify
  else if (origin === 'https://solodle.netlify.app') {
    cors({
      origin: origin,
      methods: ['GET', 'POST'], // Solo GET y POST
      credentials: true,
    })(req, res, next);
  }
  // Origen no permitido
  else {
    res.status(403).json({ error: 'Acceso no permitido desde este origen' });
  }
});

// Manejo explícito de la solicitud OPTIONS para todas las rutas
app.options('*', (req, res) => {
  const origin = req.headers.origin;

  if (origin === 'http://localhost:3000') {
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

// Usa la ruta base para las rutas de personajes
app.use(baseUrl, characterRoutes);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});