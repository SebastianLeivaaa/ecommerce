import { query } from '../config/database';


export interface Product {
  id: string; // Si prod_id es UUID, entonces debe ser string, no number
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  isActive: boolean;
  category: string;
  image: string | null; // Puede que no siempre tenga imagen, puedes ajustarlo a null
  createdAt: Date; // Este es el campo prod_fecha_creacion
}
  // Función para obtener todos los productos
export const getAllProducts = async () => {
  const result = await query('SELECT * FROM productos');
  return result.rows;
};