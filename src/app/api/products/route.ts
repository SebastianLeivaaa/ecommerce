// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { getFilteredProducts, Product, updateProduct } from '@/models/productModel';

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const active = url.searchParams.get('active') || undefined;
    const sortOrder = url.searchParams.get('sortOrder') || undefined;
    const sortBy = url.searchParams.get('sortBy') || 'rating';
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10)); // Asegura que page sea al menos 1
    const productsPerPage = Math.max(1, parseInt(url.searchParams.get('productsPerPage') || '8', 10)); // Asegura que productsPerPage sea al menos 1
    const category = url.searchParams.get('category') || null;
    const searchTerm = url.searchParams.get('searchTerm') || null;

    const { products: productsData, total: totalProducts } = await getFilteredProducts({ 
      active, 
      sortOrder, 
      sortBy, 
      page, 
      productsPerPage, 
      category,
      searchTerm
    });

    const products: Product[] = productsData.map((item: any) => ({
      id: item.prod_id,
      name: item.prod_nombre,
      description: item.prod_descripcion,
      price: item.prod_precio,
      discount: item.prod_descuento,
      stock: item.prod_stock,
      isActive: item.prod_activo,
      rating: item.prod_valoracion,
      category: item.prod_categoria,
      image: item.prod_url_imagen,
      createdAt: new Date(item.prod_fecha_creacion).toISOString(),
    }));

    return NextResponse.json({ products, totalProducts }, { status: 200 });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json(
      { message: 'Error al obtener productos', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
};


export const POST = async (request: Request) => {
  return NextResponse.json({ message: 'This is a POST request' }, { status: 200 });
};

export const PUT = async (request: Request) => {
  try {
    const body = await request.json();
    const product: Product = body;
    const result = await updateProduct(product);
    if (result === 1) {
      return NextResponse.json({ message: 'Producto actualizado' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No se pudo actualizar el producto' }, { status: 400 });
    }
  }catch (error) {
    console.error("Error al actualizar el producto:", error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
};
