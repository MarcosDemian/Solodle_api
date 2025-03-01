import pool from '../database/db.js';

class CharacterAttribute {
  static async getByCharacterId(characterId) {
    const [rows] = await pool.query(
      'SELECT a.* FROM attributes a ' +
      'JOIN character_attributes ca ON a.id = ca.attribute_id ' +
      'WHERE ca.character_id = ?',
      [characterId]
    );
    return rows;
  }

  static async add(characterId, attributeId) {
    await pool.query('INSERT INTO character_attributes (character_id, attribute_id) VALUES (?, ?)', [characterId, attributeId]);
  }

  static async remove(characterId, attributeId) {
    await pool.query('DELETE FROM character_attributes WHERE character_id = ? AND attribute_id = ?', [characterId, attributeId]);
  }
  
  static async exists(characterId, attributeId) {
    const [rows] = await pool.query(
      'SELECT * FROM character_attributes WHERE character_id = ? AND attribute_id = ?',
      [characterId, attributeId]
    );
    return rows.length > 0;
  }
}

export default CharacterAttribute;