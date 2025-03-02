import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/characters.routes.js';
import { config } from 'dotenv';
config()

const app = express();
const url = '/api/characters'

app.use(cors());
app.use(express.json());

app.use(url, characterRoutes);

app.listen(() => {
  console.log(`Servidor corriendo en https://solodleapi.up.railway.app/${url}`);
});


