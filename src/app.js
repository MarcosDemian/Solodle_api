import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/characters.routes.js';
import { config } from 'dotenv';
config()

const app = express();
const PORT = process.env.PORT
const url = 'https://solodleapi.up.railway.app/api/characters'

app.use(cors());
app.use(express.json());

app.use(url, characterRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${url}`);
});
