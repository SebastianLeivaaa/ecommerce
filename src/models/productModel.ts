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
  rating: number;
  image: string | null; // Puede que no siempre tenga imagen, puedes ajustarlo a null
  createdAt: string; // Este es el campo prod_fecha_creacion
}
  
// Función para obtener productos filtrados con paginación
export const getFilteredProducts = async (filters: { 
  sortOrder?: string, 
  active?: string, 
  sortBy?: string, 
  page: number, 
  productsPerPage: number 
} = { page: 1, productsPerPage: 8 }) => {
  const { sortOrder, active, sortBy, page, productsPerPage } = filters;
  const offset = (page - 1) * productsPerPage;

  // Construir la consulta base

  let sql = 'SELECT * FROM productos WHERE 1=1';
  let countSql = 'SELECT COUNT(prod_id) AS total FROM productos WHERE 1=1';

  const params: any[] = [];

  // Agregar condiciones de filtro si se proporcionan
  if (active === 'true' || active === 'false') {
    sql += ' AND prod_activo = $1';
    countSql += ' AND prod_activo = $1';
    params.push(active === 'true');
  }

  // Determinar la columna de ordenamiento en función de sortBy
  let orderColumn;
  switch (sortBy) {
    case 'rating':
      orderColumn = 'prod_valoracion';
      break;
    case 'price':
      orderColumn = 'prod_precio';
      break;
    case 'stock':
      orderColumn = 'prod_stock';
      break;
    default:
      orderColumn = 'prod_valoracion';
      break;
  }

  // Agregar ordenamiento y paginación
  sql += ` ORDER BY ${orderColumn} ${sortOrder === 'desc' ? 'DESC' : 'ASC'}, prod_nombre ASC LIMIT ${productsPerPage} OFFSET ${offset}`;
  // Ejecutar la consulta con los parámetros
  const result = await query(sql, params);
  const countResult = await query(countSql, params);
  const total = countResult.rows[0].total;

  return { products: result.rows, total };
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