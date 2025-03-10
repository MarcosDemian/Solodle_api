import Attribute from '../../models/attributemodel.js';
import cache from '../../config/cache.js';


export const createAttribute = async (req, res) => {
  try {
    const newAttribute = req.body;
    const insertId = await Attribute.create(newAttribute);
    cache.del('allAttributes'); 
    res.status(201).json({ id: insertId, ...newAttribute });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el atributo' });
  }
};

export const updateAttribute = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedAttribute = {};
    if (req.body.name !== undefined) {
      updatedAttribute.name = req.body.name;
    }
    if (req.body.description !== undefined) {
      updatedAttribute.description = req.body.description;
    }

    if (Object.keys(updatedAttribute).length === 0) {
      return res.status(400).json({ error: "Se requiere al menos un campo para actualizar" });
    }

    await Attribute.update(id, updatedAttribute);

    cache.del(`attribute_${id}`);
    cache.del('allAttributes');

    res.json({ id, ...updatedAttribute });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el atributo' });
  }
};

export const deleteAttribute = async (req, res) => {
  try {
    await Attribute.delete(req.params.id);
    cache.del(`attribute_${req.params.id}`);
    cache.del('allAttributes'); 
    res.status(204).json({ message: "Atributo eliminado"});
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el atributo' });
  }
};