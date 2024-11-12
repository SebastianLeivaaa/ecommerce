import { z } from 'zod';

// Esquema de validación para el formulario de producto
export const productSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  price: z.number().min(1, "El precio debe ser mayor a 0"),
  discount: z.number().min(0).max(100, "El descuento debe estar entre 0 y 100"),
  stock: z.number().min(0, "El stock no puede ser negativo"),
  isActive: z.boolean(),
  category: z.string().nonempty("La categoría es obligatoria"),
  brand: z.string().min(1, "La marca es obligatoria"),
  sku: z.string().min(1, "El SKU es obligatorio"),
  images: z.array(z.instanceof(File)).min(1, "Debe agregar al menos una imagen"),
});

// Tipos generados por Zod a partir del esquema para una mejor tipificación
export type ProductSchema = z.infer<typeof productSchema>;
