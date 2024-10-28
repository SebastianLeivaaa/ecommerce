// ProductCard.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { StockBadge } from "@/components/dashboard/products/stockBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditProductDialog } from "@/components/dashboard/products/dialogs/editProductDialog";
import { Product } from "@/models/productModel";
import { StarRating } from "./starRating";

export function ProductCard({ product }: { product: Product }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleSave = (updatedProduct: Product) => {
  };

  return (
    <Card key={product.id}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {product.name}
          <Badge variant={product.isActive ? "green" : "red"}>
            {product.isActive ? "Activo" : "Inactivo"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img src={product.image ?? ""} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <p className="font-bold">${product.price}</p>
        <p className="text-sm text-gray-500">Categoría: {product.category}</p>
        <StarRating rating={product.rating} />
        <div className="mt-2 flex justify-between items-center">
          <StockBadge stock={product.stock} />
          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
          Editar
        </Button>
        <EditProductDialog
          product={product}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={handleSave}
        />
      </CardFooter>
    </Card>
  );
}
