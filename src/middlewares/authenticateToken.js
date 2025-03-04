import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    // Verifica si el token está a punto de expirar (por ejemplo, en menos de 5 minutos)
    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    const exp = user.exp; // Tiempo de expiración del token

    if (exp - now < 300 && !req.user.tokenRenewed) { // 300 segundos = 5 minutos
      // Genera un nuevo token
      const newToken = jwt.sign(
        { userId: user.userId, username: user.username, role: user.role },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );
    
      // Envía el nuevo token en la cabecera de la respuesta
      res.setHeader('New-Access-Token', newToken);
      req.user.tokenRenewed = true; // Marca el token como renovado
    }

    req.user = user;
    next();
  });
};