import dotenv from 'dotenv';
dotenv.config();

export default {
    secret: process.env.JWT_SECRET,
    expiresIn: '1h', // Tiempo de expiración del token
  };
  