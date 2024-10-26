import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { StockBadge } from "@/components/dashboard/products/stockBadge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Edit } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Product } from "@/models/productModel"

export function ProductCard({ product }: { product: Product }) { // Aplica el tipo Product


    const [editingProduct, setEditingProduct] = useState<Product>(product);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [productName, setProductName] = useState(product.name)
    const [productDescription, setProductDescription] = useState(product.description)
    const [productPrice, setProductPrice] = useState((product.price ?? 0).toString())
    const [productDescount, setProductDescount] = useState((product.discount ?? 0).toString())
    const [productCategory, setProductCategory] = useState(product.category)
    const [productStock, setProductStock] = useState((product.stock ?? 0).toString())
    const [productIsActive, setProductIsActive] = useState(product.isActive)

    const [dataProduct, setDataProduct] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        descount: product.discount,
        category: product.category,
        stock: product.stock,
        isActive: product.isActive
    })

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setDataProduct({
            name: productName,
            description: productDescription,
            price: parseFloat(productPrice),
            descount: parseFloat(productDescount),
            category: productCategory,
            stock: parseInt(productStock),
            isActive: productIsActive
        })
        setIsEditDialogOpen(false)
        resetForm()
    }

    const resetForm = () => {
        setProductName("")
        setProductDescription("")
        setProductPrice("")
        setProductDescount("")
        setProductCategory("")
        setEditingProduct(product)
    }

    const startEditing = (product: Product) => {
        setEditingProduct(product)
        setProductName(product.name)
        setProductDescription(product.description)
        setProductPrice(product.price.toString())
        setProductDescount(product.discount.toString())
        setProductCategory(product.category)
        setIsEditDialogOpen(true)
    }

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
                <div className="mt-2 flex justify-between items-center">
                    <StockBadge stock={product.stock} />
                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => startEditing(product)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar Producto</DialogTitle>
                            <DialogDescription>
                                Realiza los cambios necesarios en el producto. Haz clic en guardar cuando hayas terminado.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div>
                        <Label htmlFor="productName">Nombre del Producto</Label>
                        <Input
                          id="productName"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          placeholder="Ingrese el nombre del producto"
                        />
                      </div>
                      <div>
                        <Label htmlFor="productDescription">Descripción</Label>
                        <Textarea
                          id="productDescription"
                          value={productDescription}
                          onChange={(e) => setProductDescription(e.target.value)}
                          
                          placeholder="Ingrese la descripción del producto"
                        />
                      </div>
                      <div>
                        <Label htmlFor="productPrice">Precio</Label>
                        <Input
                          id="productPrice"
                          type="number"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          placeholder="Ingrese el precio del producto"
                        />
                      </div>
                      <div>
                        <Label htmlFor="productDescount">Descuento (%)</Label>
                        <Input
                          id="productDescount"
                          type="number"
                          max={100}
                          min={0}
                          value={productDescount}
                          onChange={(e) => setProductDescount(e.target.value)}
                          placeholder="Ingrese el descuento del producto"
                        />
                      </div>
                      <div>
                        <Label htmlFor="productCategory">Categoría</Label>
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
                        <Label htmlFor="productStock">Stock</Label>
                        <Input
                          id="productStock"
                          type="number"
                          value={productStock}
                          onChange={(e) => setProductStock(e.target.value)}
                          placeholder="Ingrese el stock del producto"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="productIsActive"
                          checked={productIsActive}
                          onCheckedChange={setProductIsActive}
                        />
                        <Label htmlFor="productIsActive">Producto Activo</Label>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Guardar Cambios</Button>
                      </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}
