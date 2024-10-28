// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/models/productModel';
import axios from 'axios';

const fetchProducts = async (filters: { active?: string}) => {
  const { active } = filters;
  const response = await axios.get('/api/products', {
    params: { active }
  });

  return response.data;
};

export const useProducts = (filters: { active?: string}) => {
  return useQuery<Product[]>({
    queryKey: ['products', filters], // Añadir filtros a la clave de la consulta
    queryFn: () => fetchProducts(filters),
  });
};
