
import { NextResponse } from "next/server";
import { getBrands, Brand } from "@/models/brandModel";

export const GET = async (request: Request) => {
    try {
        const brandsData = await getBrands();

        const brands: Brand[] = brandsData.map((item: any) => ({
            id: item.marc_id,
            name: item.marc_nombre,
        }));

        return NextResponse.json(brands, { status: 200 });
    } catch (error) {
        console.error("Error al obtener marcas:", error);
        return NextResponse.json(
            { message: "Error al obtener marcas", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
};