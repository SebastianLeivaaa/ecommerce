import { query } from '../config/database';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  isActive: boolean;
  category: string;
  brand: string;
  sku: string;
  rating: number;
  createdAt: string;
  images: File[];
}

// Función para obtener productos filtrados con paginación
export const getFilteredProducts = async (filters: { 
  sortOrder?: string, 
  active?: string, 
  sortBy?: string, 
  page: number, 
  productsPerPage: number,
  category?: string | null,
  searchTerm?: string | null,
} = { page: 1, productsPerPage: 8 }) => {
  const { sortOrder, active, sortBy, page, productsPerPage, category, searchTerm } = filters;
  const offset = (page - 1) * productsPerPage;

  let sql = 'SELECT * FROM productos pr WHERE 1=1';
  let countSql = 'SELECT COUNT(prod_id) AS total FROM productos pr WHERE 1=1';
  const sqlParams: any[] = [];
  const countParams: any[] = [];

  // Filtrado por término de búsqueda
  if (searchTerm) {
    const searchTermFormatted = `%${searchTerm}%`;
    sql = `SELECT * FROM productos pr JOIN producto_categoria pc ON pr.prod_id = pc.prca_prod_id WHERE (pr.prod_nombre ILIKE $${sqlParams.length + 1})`;
    countSql = `SELECT COUNT(pr.prod_id) AS total FROM productos pr JOIN producto_categoria pc ON pr.prod_id = pc.prca_prod_id WHERE (pr.prod_nombre ILIKE $${countParams.length + 1})`;
    sqlParams.push(searchTermFormatted);
    countParams.push(searchTermFormatted);
  }

  // Filtrado por categoría
  if (category) {
    sql = `SELECT * FROM productos pr JOIN producto_categoria pc ON pr.prod_id = pc.prca_prod_id WHERE pc.prca_cate_id = $1`;
    countSql = `SELECT COUNT(pr.prod_id) AS total FROM productos pr JOIN producto_categoria pc ON pr.prod_id = pc.prca_prod_id WHERE pc.prca_cate_id = $1`;
    sqlParams.push(category);
    countParams.push(category);
  }


  // Filtrado por estado activo
  if (active === 'true' || active === 'false') {
    sql += ` AND pr.prod_activo = $${sqlParams.length + 1}`;
    countSql += ` AND pr.prod_activo = $${countParams.length + 1}`;
    sqlParams.push(active);
    countParams.push(active);
  }

  // Ordenar por columna
  let orderColumn;
  switch (sortBy) {
    case 'rating':
      orderColumn = 'pr.prod_valoracion';
      break;
    case 'price':
      orderColumn = 'pr.prod_precio';
      break;
    case 'stock':
      orderColumn = 'pr.prod_stock';
      break;
    default:
      orderColumn = 'pr.prod_valoracion';
      break;
  }

  // Agregar orden y límites
  sql += ` ORDER BY ${orderColumn} ${sortOrder === 'desc' ? 'DESC' : 'ASC'}, pr.prod_nombre ASC LIMIT $${sqlParams.length + 1} OFFSET $${sqlParams.length + 2}`;
  sqlParams.push(productsPerPage, offset);

  // Ejecutar consultas
  const result = await query(sql, sqlParams);
  const countResult = await query(countSql, countParams);
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