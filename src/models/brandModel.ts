import { query } from '../config/database';

export interface Brand {
  id: string;
  name: string;
}

// Función para obtener categorías
export const getBrands = async () => {
    let sql = 'SELECT * FROM marcas';
    const { rows } = await query(sql)
    return rows;
}