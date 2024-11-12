import { query } from '../config/database';

export interface Category {
  id: string;
  name: string;
  description: string;
  parent_id: string;
}

// Función para obtener categorías
export const getCategories = async (parent_id: string | null = null) => {
    let sql = 'SELECT * FROM categorias WHERE cate_padre_id IS NULL';
    const params: any[] = [];

    if (parent_id) {
        sql = 'SELECT * FROM categorias WHERE cate_padre_id = $1';
        params.push(parent_id);
    }

    const { rows } = await query(sql, params)
    return rows;
}
