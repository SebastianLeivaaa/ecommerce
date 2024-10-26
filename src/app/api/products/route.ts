// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { getAllProducts, Product } from '@/models/productModel';

export const GET = async (request: Request) => {
  try {
    const productsData = await getAllProducts();
    const products: Product[] = productsData.map((item: any) => ({
      id: item.prod_id,
      name: item.prod_nombre,
      description: item.prod_descripcion,
      price: item.prod_precio,
      discount: item.prod_descuento,
      stock: item.prod_stock,
      isActive: item.prod_activo,
      category: '',
      image: item.prod_url_imagen,
      createdAt: new Date(item.prod_fecha_creacion),
    }));
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json({ message: 'Error al obtener productos' }, { status: 500 });
  }
};

export const POST = async (request: Request) => {
  return NextResponse.json({ message: 'This is a POST request' }, { status: 200 });
};
