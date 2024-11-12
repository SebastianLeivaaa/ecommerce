import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { X, Upload, ArrowRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/models/productModel';
import { productSchema } from '@/validations/products/productValidation';

export default function GeneralProductData({ onNextStep }: { onNextStep: () => void }) {
  const [product, setProduct] = useState<Omit<Product, 'id' | 'createdAt' | 'slug' | 'rating'>>({
    name: '',
    description: '',
    price: 0,
    discount: 0,
    stock: 0,
    isActive: true,
    category: '',
    brand: '',
    sku: '',
    images: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNextStep = () => {
    const result = productSchema.safeParse(product);  // Validación usando Zod
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(newErrors);
    } else {
      setErrors({});
      onNextStep();
    }
  };

  // Actualiza el estado de cada campo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setProduct((prev) => ({ ...prev, [id]: value }));
  };

  // Manejo de imágenes
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setProduct((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    const newImages = product.images.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, images: newImages }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Información del producto</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:grid md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="name">Nombre del Producto</Label>
          <Input id="name" type="text" placeholder="Nombre del producto" value={product.name} onChange={handleChange} />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="category">Categoría</Label>
          <Select name="category" onValueChange={(value) => setProduct((prev) => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electrónicos</SelectItem>
              <SelectItem value="clothing">Ropa</SelectItem>
              <SelectItem value="books">Libros</SelectItem>
              <SelectItem value="home">Hogar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-y-1 col-span-2">
          <Label htmlFor="description">Descripción</Label>
          <textarea
            id="description"
            placeholder="Descripción del producto..."
            className="w-full h-32 p-2 rounded border-[0.5px]"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="sku">SKU</Label>
          <Input id="sku" type="text" placeholder="SKU del producto" value={product.sku} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="price">Precio</Label>
          <Input id="price" type="number" placeholder="Precio del producto" value={product.price} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="discount">Descuento (%)</Label>
          <Input id="discount" type="number" max={100} min={0} placeholder="Descuento del producto" value={product.discount} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="active">Activo</Label>
          <Select name="active" onValueChange={(value) => setProduct((prev) => ({ ...prev, isActive: value === 'true' }))}>
            <SelectTrigger>
              <SelectValue placeholder="Estado del producto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Activo</SelectItem>
              <SelectItem value="false">Inactivo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="stock">Stock</Label>
          <Input id="stock" type="number" placeholder="Stock del producto" value={product.stock} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label htmlFor="brand">Marca</Label>
          <Input id="brand" type="text" placeholder="Marca del producto" value={product.brand} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-y-1 col-span-2">
          <Label>Galeria del producto</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.images.map((image, index) => (
              <div key={index} className="relative">
                <img src={URL.createObjectURL(image)} alt={`Product ${index}`} className="w-24 h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
                {index === 0 ? (
                  <span className="absolute bottom-0 text-center w-full justify-center bg-green-700 text-white flex p-0.5">
                    Portada
                  </span>
                ) : (
                  <span className="absolute bottom-0 right-0 bg-blue-500 text-white p-0.5 px-2">{index + 1}</span>
                )}
              </div>
            ))}
            <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed rounded cursor-pointer">
              <input type="file" multiple onChange={handleImageUpload} className="hidden" />
              <Upload size={24} />
            </label>
          </div>
        </div>
        <div className="col-span-2 flex justify-end">
          <Button type='button' className="bg-blue-600 hover:bg-blue-700" onClick={handleNextStep}>
            Siguiente
            <ArrowRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}