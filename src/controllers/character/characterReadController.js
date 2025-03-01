import Character from "../../models/charactersmodel.js";
import { getNextMidnight, handleError, getCachedData } from './characterHelpers.js';
import cache from "../../config/cache.js";

export const getRandomCharacter = async (req, res) => {
  const cacheKey = 'randomCharacter';
  const cachedData = cache.get(cacheKey);

  if (cachedData && new Date() < getNextMidnight()) {
    return res.json(cachedData);
  }

  try {
    const characters = await Character.getAll();
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];

    const now = new Date();
    const nextMidnight = getNextMidnight();
    const ttl = Math.floor((nextMidnight - now) / 1000);

    cache.set(cacheKey, randomCharacter, ttl);
    res.json(randomCharacter);
  } catch (error) {
    handleError(res, error, 'Error al obtener el personaje aleatorio');
  }
};

export const getAllCharacters = async (req, res) => {
  const cacheKey = 'allCharacters';
  try {
    const characters = await getCachedData(cacheKey, 3600, () => Character.getAll());
    res.json(characters);
  } catch (error) {
    handleError(res, error, "Error al obtener los personajes");
  }
};

export const getCharacterById = async (req, res) => {
  const cacheKey = `character_${req.params.id}`;
  try {
    const character = await getCachedData(cacheKey, 3600, () => Character.getById(req.params.id));
    if (!character) {
      return res.status(404).json({ error: "Personaje no encontrado" });
    }
    res.json(character);
  } catch (error) {
    handleError(res, error, "Error al obtener el personaje");
  }
};

export const getCharactersByGender = async (req, res) => {
  try {
    const gender = req.params.gender;
    const characters = await Character.getByGender(gender);
    res.json(characters);
  } catch (error) {
    handleError(res, error, 'Error al obtener los personajes por género');
  }
};

export const getCharactersBySpecies = async (req, res) => {
  try {
    const species = req.params.species;
    const characters = await Character.getBySpecies(species);
    res.json(characters);
  } catch (error) {
    handleError(res, error, 'Error al obtener los personajes por especie');
  }
};

export const getCharactersByAffiliation = async (req, res) => {
  try {
    const affiliation = req.params.affiliation;
    const characters = await Character.getByAffiliation(affiliation);
    res.json(characters);
  } catch (error) {
    handleError(res, error, 'Error al obtener los personajes por afiliación');
  }
};

export const getCharacterAttributes = async (req, res) => {
  try {
    const characterId = req.params.id;
    const attributes = await Character.getAttributes(characterId);
    res.json(attributes);
  } catch (error) {
    handleError(res, error, 'Error al obtener los atributos del personaje');
  }
};