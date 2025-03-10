import Character from "../../models/charactersmodel.js";
import cloudinary from '../../config/cloudinary.js';
import fs from 'fs';
import cache from '../../config/cache.js';
import { handleError } from './characterHelpers.js';


export const createCharacter = async (req, res) => {
  try {
    const newCharacter = req.body;

    if (!req.files || !req.files.image || !req.files.image_150x150) {
      return res.status(400).json({ error: "Ambas imágenes (image y image_150x150) son requeridas" });
    }

    const { image, image_150x150 } = req.files;

    const result = await cloudinary.uploader.upload(image[0].path, {
      folder: 'solo-leveling-characters',
    });
    newCharacter.image = result.secure_url;
    fs.unlinkSync(image[0].path); 

    const result150x150 = await cloudinary.uploader.upload(image_150x150[0].path, {
      folder: 'solo-leveling-150x150',
      transformation: [{ width: 150, height: 150, crop: 'fill' }]
    });
    newCharacter.image_150x150 = result150x150.secure_url;
    fs.unlinkSync(image_150x150[0].path);

    const insertId = await Character.create(newCharacter);

    cache.del('allCharacters');

    res.status(201).json({ id: insertId, ...newCharacter });
  } catch (error) {
    handleError(res, error, 'Error al crear el personaje');
  }
};

export const updateCharacter = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCharacter = {};
    const fields = ['name', 'gender', 'species', 'affiliation', 'main_weapon', 'image', 'image_150x150'];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updatedCharacter[field] = req.body[field];
      }
    });

    if (Object.keys(updatedCharacter).length === 0) {
      return res.status(400).json({ error: "Se requiere al menos un campo para actualizar" });
    }

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