// src/app/api/categories/route.ts

import { NextResponse } from 'next/server';
import { getCategories, Category } from '@/models/categoryModel';

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const parentId = url.searchParams.get('categoryId') || null;
        const categoriesData = await getCategories(parentId);

        const categories: Category[] = categoriesData.map((item: any) => ({
            id: item.cate_id,
            name: item.cate_nombre,
            description: item.cate_descripcion,
            parent_id: item.cate_padre_id
        }));

        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        return NextResponse.json(
        { message: 'Error al obtener categorías', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
        );
    }
};