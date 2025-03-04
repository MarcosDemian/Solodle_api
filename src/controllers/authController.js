import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig.js';
import db from '../database/db.js';
import { body, validationResult } from 'express-validator';
import { createUser, findUserByUsername } from '../models/UserModel.js';

export const validateLogin = [
  body('username')
    .trim() // Elimina espacios en blanco al inicio y al final
    .escape() // Escapa caracteres especiales para evitar XSS
    .notEmpty().withMessage('El nombre de usuario es requerido')
    .isLength({ min: 3, max: 20 }).withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres'),

  body('password')
    .trim()
    .escape()
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6, max: 50 }).withMessage('La contraseña debe tener entre 6 y 50 caracteres'),
];

export const validateRegister = [
  body('username')
    .trim()
    .escape()
    .notEmpty().withMessage('El nombre de usuario es requerido')
    .isLength({ min: 3, max: 20 }).withMessage('El nombre de usuario debe tener entre 3 y 20 caracteres'),

  body('password')
    .trim()
    .escape()
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6, max: 50 }).withMessage('La contraseña debe tener entre 6 y 50 caracteres'),
];

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const [users] = await db.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = users[0];

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    await createUser(username, password);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};