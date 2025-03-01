import Attribute from '../../models/attributemodel.js';
import cache from '../../config/cache.js';

export const getAllAttributes = async (req, res) => {
  const cacheKey = 'allAttributes';
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData); 
  }

  try {
    const attributes = await Attribute.getAll();
    cache.set(cacheKey, attributes, 3600); // Almacenar en caché por 1 hora
    res.json(attributes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los atributos' });
  }
};

export const getAttributeById = async (req, res) => {
  const cacheKey = `attribute_${req.params.id}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.json(cachedData); 
  }

  try {
    const attribute = await Attribute.getById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ error: 'Atributo no encontrado' });
    }
    cache.set(cacheKey, attribute, 3600); // Almacenar en caché por 1 hora
    res.json(attribute);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el atributo' });
  }
};