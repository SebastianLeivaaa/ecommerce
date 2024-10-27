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
  createdAt: string; // Este es el campo prod_fecha_creacion
}
  
// Función para obtener todos los productos
export const getAllProducts = async () => {
  const result = await query('SELECT * FROM productos');
  return result.rows;
};

// Función para actualizar datos de un producto
export const updateProduct = async (product: Product) => {
  const result = await query(
    `UPDATE productos SET 
      prod_nombre = $1, 
      prod_descripcion = $2, 
      prod_precio = $3, 
      prod_descuento = $4, 
      prod_stock = $5, 
      prod_activo = $6
    WHERE prod_id = $7`,
    [
      product.name,
      product.description,
      product.price,
      product.discount,
      product.stock,
      product.isActive,
      product.id
    ]
  );
  return result.rowCount;
}