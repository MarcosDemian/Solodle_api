import cache from '../../config/cache.js';
import moment from 'moment-timezone';

//Función para calcular la próxima medianoche
export const getNextMidnight = () => {
  const now = moment().tz('America/Argentina/Buenos_Aires');
  const midnight = now.clone().endOf('day').add(1, 'second'); // Próxima medianoche
  return midnight.toDate();
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