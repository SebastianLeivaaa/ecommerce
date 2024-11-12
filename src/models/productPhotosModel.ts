import { query } from "@/config/database";

export interface ProductPhoto {
  id: string;
  productId: string;
  variantProductId: string,
  url: string;
  order: number;
}