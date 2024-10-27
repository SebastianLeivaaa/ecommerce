// hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/models/productModel';
import axios from 'axios';

const fetchProducts = async () => {
  const response = await axios.get('/api/products');

  return response.data;
};

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};
