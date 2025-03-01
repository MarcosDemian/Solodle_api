import cache from '../../config/cache.js';

//Función para calcular la próxima medianoche
export const getNextMidnight = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight;
};

//Helper para manejar errores
export const handleError = (res, error, message) => {
  console.error(message, error);
  res.status(500).json({ error: message });
};

//Helper para manejar la caché
export const getCachedData = (cacheKey, ttl, fetchData) => {
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }
  const data = fetchData();
  cache.set(cacheKey, data, ttl);
  return data;
};