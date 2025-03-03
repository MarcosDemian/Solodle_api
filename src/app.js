import express from 'express';
import cors from 'cors';
import characterRoutes from './routes/characters.routes.js';
import { config } from 'dotenv';
config()

const app = express();
const port = process.env.PORT || 3000;
const url = 'https://solodleapi.up.railway.app/api/characters'

app.use(cors());
app.use(express.json());

app.use(url, characterRoutes);

app.listen(port, url, () => {
  console.log(`Servidor corriendo en ${url}`);
});
