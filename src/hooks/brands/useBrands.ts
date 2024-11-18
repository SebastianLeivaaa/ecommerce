import { useQuery } from '@tanstack/react-query';
import { Brand } from '@/models/brandModel';
import axios from 'axios';

// Función para obtener todas las categorías sin necesidad de un categoryId
const fetchBrands = async () => {
  const response = await axios.get('/api/brands');
  return response.data;
};

// Hook para obtener todas las categorías
export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'], // Query sin categoryId
    queryFn: fetchBrands, // Llamar a fetchCategories sin categoryId
    select: (data) => data as Brand[], // Ajustar el tipo de datos retornado
  });
};
