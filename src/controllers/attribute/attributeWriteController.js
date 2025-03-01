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
  try {
    const updatedAttribute = req.body;
    await Attribute.update(req.params.id, updatedAttribute);
    cache.del(`attribute_${req.params.id}`); 
    cache.del('allAttributes'); 
    res.json({ id: req.params.id, ...updatedAttribute });
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