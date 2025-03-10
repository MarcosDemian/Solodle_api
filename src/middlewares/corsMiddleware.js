import cors from 'cors';

const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  if (!origin) {
    return next();
  }

  if (origin === 'http://localhost:5173' || origin === 'http://localhost:3000') {
    cors({
      origin: origin,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })(req, res, next);
  } else if (origin === 'https://solodle.netlify.app') {
    cors({
      origin: origin,
      methods: ['GET', 'POST'],
      credentials: true,
    })(req, res, next);
  } else {
    res.status(403).json({ error: 'Acceso no permitido desde este origen' });
  }
};

export default corsMiddleware;