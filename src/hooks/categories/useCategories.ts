import { useQuery } from '@tanstack/react-query';
import { Category } from '@/models/categoryModel';
import axios from 'axios';

// Función para obtener categorías con un categoryId opcional
const fetchCategories = async (categoryId: string | null) => {
  const response = await axios.get(`/api/categories`, {
    params: { categoryId },
  });
  return response.data;
};

// Hook para obtener detalles de la categoría, incluyendo breadcrumb y subcategorías
export const useCategories = (categoryId: string | null) => {
  return useQuery({
    queryKey: ['categories', categoryId], // Añadir categoryId al queryKey para que sea único
    queryFn: () => fetchCategories(categoryId), // Llamar a fetchCategories con categoryId
    select: (data) => data as Category[], // Ajustar el tipo de datos retornado
  });
};
