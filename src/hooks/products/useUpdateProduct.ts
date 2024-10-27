// hooks/useUpdateProduct.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/models/productModel';
import axios from 'axios';

const updateProduct = async (product: Product) => {
    const response = await axios.put(`/api/products`, product);
  
    return response.data;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      // Invalida y vuelve a obtener la consulta de productos
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('Error al actualizar el producto:', error);
      // Maneja el error aquí, mostrando un mensaje o notificación al usuario
    }
  });
};
