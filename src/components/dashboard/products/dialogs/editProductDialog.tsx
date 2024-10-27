// components/EditProductDialog.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/models/productModel";
import axios from 'axios';
import { useUpdateProduct } from "@/hooks/products/useUpdateProduct";

interface EditProductDialogProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

export function EditProductDialog({ product, isOpen, onClose, onSave }: EditProductDialogProps) {
  const [productName, setProductName] = useState(product.name);
  const [productDescription, setProductDescription] = useState(product.description);
  const [productPrice, setProductPrice] = useState((product.price ?? 0).toString());
  const [productDiscount, setProductDiscount] = useState((product.discount ?? 0).toString());
  const [productCategory, setProductCategory] = useState(product.category);
  const [productStock, setProductStock] = useState((product.stock ?? 0).toString());
  const [productIsActive, setProductIsActive] = useState(product.isActive);
  const mutation = useUpdateProduct(); 

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct: Product = {
      ...product,
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      discount: parseFloat(productDiscount),
      category: productCategory,
      stock: parseInt(productStock),
      isActive: productIsActive,
    };

    mutation.mutate(updatedProduct, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error('Error al actualizar el producto:', error);
        // Maneja el error aquí, mostrando un mensaje o notificación al usuario
      }
    });    
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
          <DialogDescription>Edita los detalles del producto y guarda los cambios.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <Label>Nombre del Producto</Label>
            <Input value={productName} onChange={(e) => setProductName(e.target.value)} />
          </div>
          <div>
            <Label>Descripción</Label>
            <Textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
          </div>
          <div>
            <Label>Precio</Label>
            <Input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          </div>
          <div>
            <Label>Descuento (%)</Label>
            <Input type="number" max={100} min={0} value={productDiscount} onChange={(e) => setProductDiscount(e.target.value)} />
          </div>
          <div>
            <Label>Categoría</Label>
            <Select value={productCategory} onValueChange={setProductCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electrónica</SelectItem>
                <SelectItem value="clothing">Ropa</SelectItem>
                <SelectItem value="books">Libros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Stock</Label>
            <Input type="number" value={productStock} onChange={(e) => setProductStock(e.target.value)} />
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={productIsActive} onCheckedChange={setProductIsActive} />
            <Label>Producto Activo</Label>
          </div>
          <DialogFooter>
            <Button type="submit">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
