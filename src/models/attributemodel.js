import pool from '../database/db.js';

class Attribute {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM attributes');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM attributes WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(attribute) {
    const { name, description } = attribute;
    const [result] = await pool.query('INSERT INTO attributes (name, description) VALUES (?, ?)', [name, description]);
    return result.insertId;
  }

  static async update(id, attribute) {
    const { name, description } = attribute;
    console.log("Datos recibidos desde el modelo:" + name, description);
    const [result] = await pool.query('UPDATE attributes SET name = ?, description = ? WHERE id = ?', [name, description, id]);
    return result.affectedRows;
  }

  static async delete(id) {
    await pool.query('DELETE FROM attributes WHERE id = ?', [id]);
  }
}

export default Attribute;