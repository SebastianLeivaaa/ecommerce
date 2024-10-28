// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/models/productModel';
import axios from 'axios';

// Actualizamos la función para que retorne un objeto con productos y total
const fetchProducts = async (filters: { 
  sortOrder?: string, 
  active?: string, 
  sortBy?: string, 
  page: number, 
  productsPerPage: number 
}) => {
  const response = await axios.get('/api/products', {
    params: filters,
  });

  // Asegúrate de que la respuesta tenga la estructura adecuada
  return {
    products: response.data.products, // Asumiendo que la API devuelve un array de productos
    totalProducts: response.data.totalProducts, // Y el total de productos
  };
};

export const useProducts = (filters: { sortOrder?: string, active?: string, sortBy?: string, page: number, productsPerPage: number}) => {
  return useQuery({
    queryKey: ['products', filters], // Añadir filtros a la clave de la consulta
    queryFn: () => fetchProducts(filters),
    // Para que TypeScript sepa qué tipo de dato devuelve
    select: (data) => data as { products: Product[]; totalProducts: number },
  });
};
