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
    const now = Math.floor(Date.now() / 1000); 
    const exp = user.exp; 

    if (exp - now < 300 && !req.user.tokenRenewed) {
      const newToken = jwt.sign(
        { userId: user.userId, username: user.username, role: user.role },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );
    
      res.setHeader('New-Access-Token', newToken);
      req.user.tokenRenewed = true;
    }

    req.user = user;
    next();
  });
};