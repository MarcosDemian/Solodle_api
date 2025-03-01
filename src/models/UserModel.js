import db from '../database/db.js';

export const findUserByUsername = async (username) => {
  const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return users[0];
};

export const createUser = async (username, password) => {
    await db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)', // El rol por defecto es 'user'
      [username, password]
    );
  };