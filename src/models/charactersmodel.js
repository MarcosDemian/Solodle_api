import pool from '../database/db.js';
import CharacterAttribute from './characterattributemodel.js';

class Character {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM characters');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM characters WHERE id = ?', [id]);
    return rows[0];
  }

  static async getByGender(gender) {
    const [rows] = await pool.query(
      'SELECT * FROM characters WHERE gender = ?',
      [gender]
    );
    return rows;
  }

  static async getBySpecies(species) {
    const [rows] = await pool.query(
      'SELECT * FROM characters WHERE species = ?',
      [species]
    );
    return rows;
  }

  static async getByAffiliation(affiliation) {
    const [rows] = await pool.query(
      'SELECT * FROM characters WHERE affiliation = ?',
      [affiliation]
    );
    return rows;
  }

  static async create(character) {
    const { name, gender, species, affiliation, main_weapon, image } = character;
    const [result] = await pool.query(
      'INSERT INTO characters (name, gender, species, affiliation, main_weapon, image) VALUES (?, ?, ?, ?, ?, ?)',
      [name, gender, species, affiliation, main_weapon, image]
    );
    return result.insertId;
  }

  static async update(id, character) {
    const { name, gender, species, affiliation, main_weapon, image } = character;
  
    if (!name || !gender || !species || !affiliation || !main_weapon || !image) {
      throw new Error('Todos los campos son requeridos');
    }

    const [result] = await pool.query(
      'UPDATE characters SET name = ?, gender = ?, species = ?, affiliation = ?, main_weapon = ?, image = ? WHERE id = ?',
      [name, gender, species, affiliation, main_weapon, image, id]
    );

    return result.affectedRows;
  }

  static async delete(id) {
    await pool.query('DELETE FROM characters WHERE id = ?', [id]);
  }

  static async getAttributes(characterId) {
    return await CharacterAttribute.getByCharacterId(characterId);
  }

  static async addAttribute(characterId, attributeId) {
    await CharacterAttribute.add(characterId, attributeId);
  }

  static async removeAttribute(characterId, attributeId) {
    await CharacterAttribute.remove(characterId, attributeId);
  }
}

export default Character;