import Character from "../../models/charactersmodel.js";
import cloudinary from '../../config/cloudinary.js';
import fs from 'fs';
import cache from '../../config/cache.js';
import { handleError } from './characterHelpers.js';


export const createCharacter = async (req, res) => {
  try {
    const newCharacter = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'solo-leveling-characters',
      });
      newCharacter.image = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const insertId = await Character.create(newCharacter);

    cache.del('allCharacters');

    res.status(201).json({ id: insertId, ...newCharacter });
  } catch (error) {
    handleError(res, error, 'Error al crear el personaje');
  }
};

export const updateCharacter = async (req, res) => {
  const { id } = req.params;
  const { name, gender, species, affiliation, main_weapon, image } = req.body;

  if (!name || !gender || !species || !affiliation || !main_weapon || !image) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    const updatedCharacter = { name, gender, species, affiliation, main_weapon, image };

    const affectedRows = await Character.update(id, updatedCharacter);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Personaje no encontrado" });
    }

    cache.del(`character_${id}`);
    cache.del('allCharacters');

    res.json({ id, ...updatedCharacter });
  } catch (error) {
    handleError(res, error, "Error al actualizar el personaje");
  }
};

export const deleteCharacter = async (req, res) => {
  try {
    const affectedRows = await Character.delete(req.params.id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Personaje no encontrado" });
    }

    cache.del(`character_${req.params.id}`);
    cache.del('allCharacters');

    res.status(204).json({ message: "Personaje eliminado"});
  } catch (error) {
    handleError(res, error, "Error al eliminar el personaje");
  }
};

export const addCharacterAttribute = async (req, res) => {
  try {
    const { characterId, attributeId } = req.params;

    await Character.addAttribute(characterId, attributeId);

    cache.del(`character_${characterId}`);
    cache.del('allCharacters');

    res.status(201).json({ message: "Atributo añadido correctamente" });
  } catch (error) {
    handleError(res, error, "Error al añadir el atributo");
  }
};