import Attribute from '../../models/attributemodel.js';


export const attributeExists = async (attributeId) => {
  const attribute = await Attribute.getById(attributeId);
  return !!attribute;
};

export const validateAttributeData = (name, description) => {
  if (!name || !description) {
    throw new Error('Nombre y descripción son obligatorios');
  }
};