// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/models/productModel';
import axios from 'axios';

const fetchProducts = async (filters: { 
  sortOrder?: string, 
  active?: string, 
  sortBy?: string, 
  page: number, 
  productsPerPage: number,
  category?: string | null,
  searchTerm?: string,
}) => {
  const response = await axios.get('/api/products', {
    params: filters,
  });

  return {
    products: response.data.products, 
    totalProducts: response.data.totalProducts, 
  };
};

export const useProducts = (filters: { sortOrder?: string, active?: string, sortBy?: string, page: number, productsPerPage: number, category?: string | null, searchTerm?: string}) => {
  return useQuery({
    queryKey: ['products', filters], 
    queryFn: () => fetchProducts(filters),
    select: (data) => data as { products: Product[]; totalProducts: number },
  });
};
