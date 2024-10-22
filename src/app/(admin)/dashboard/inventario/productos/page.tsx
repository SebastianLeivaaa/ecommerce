// app/dashboard/products/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Package, ShoppingCart, Users, BarChart2, Settings, Edit, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


// Productos de ejemplo
const initialProducts = [
  { id: 1, name: "Laptop Pro", description: "Potente laptop para profesionales", price: 1500000, descount: 0, category: "electronics", image: "/placeholder.svg", stock: 50, isActive: true },
  { id: 2, name: "Camiseta Casual", description: "Camiseta cómoda para el día a día", price: 15000, descount: 0, category: "clothing", image: "/placeholder.svg", stock: 100, isActive: true },
  { id: 3, name: "Libro de Cocina", description: "Recetas fáciles para principiantes", price: 5000, descount: 0, category: "books", image: "/placeholder.svg", stock: 30, isActive: true },
  { id: 4, name: "Smartphone X", description: "Último modelo con cámara avanzada", price: 450000, descount: 0, category: "electronics", image: "/placeholder.svg", stock: 20, isActive: true },
  { id: 5, name: "Zapatillas Deportivas", description: "Para correr y entrenar", price: 50000, descount: 0, category: "clothing", image: "/placeholder.svg", stock: 5, isActive: true },
  { id: 6, name: "Novela Bestseller", description: "El libro más vendido del año", price: 25000, descount: 0, category: "books", image: "/placeholder.svg", stock: 0, isActive: false },
  { id: 7, name: "Tablet Pro", description: "Perfecta para trabajo y entretenimiento", price: 230000, descount: 0, category: "electronics", image: "/placeholder.svg", stock: 15, isActive: true },
  { id: 8, name: "Chaqueta de Invierno", description: "Abrigada y estilosa", price: 48000, descount: 0, category: "clothing", image: "/placeholder.svg", stock: 25, isActive: true },
  { id: 9, name: "Libro de Fotografía", description: "Técnicas avanzadas de fotografía", price: 12000, descount: 0, category: "books", image: "/placeholder.svg", stock: 10, isActive: true },
  { id: 10, name: "Auriculares Inalámbricos", description: "Sonido de alta calidad", price: 18000, descount: 0, category: "electronics", image: "/placeholder.svg", stock: 40, isActive: true },
  { id: 11, name: "Pantalones Vaqueros", description: "Clásicos y duraderos", price: 32000, descount: 0, category: "clothing", image: "/placeholder.svg", stock: 60, isActive: true },
  { id: 12, name: "Guía de Viajes", description: "Descubre los mejores destinos", price: 22000, descount: 0, category: "books", image: "/placeholder.svg", stock: 3, isActive: true },
]

const STOCK_THRESHOLD = {
  LOW: 5,
  OUT: 0
}

function getStockStatus(stock: number) {
  if (stock <= STOCK_THRESHOLD.OUT) return "Agotado"
  if (stock <= STOCK_THRESHOLD.LOW) return "Pocas unidades"
  return "En stock"
}

function StockBadge({ stock }: { stock: number }) {
  const status = getStockStatus(stock)
  let variant: "default" | "secondary" | "green" | "red"| "yellow" | "destructive" = "default"
  
  if (status === "Agotado") variant = "red"
  else if (status === "Pocas unidades") variant = "yellow"
  else if (status === "En stock") variant = "green"

  return <Badge variant={variant}>{status}</Badge>
}

const categories = ["Todos", "electronics", "clothing", "books"]

function PaginationControls({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (pageNumber: number) => void }) {
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          variant={currentPage === number ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange(number)}
        >
          {number}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default function ProductsPage() {

  const [products, setProducts] = useState(initialProducts)
  const [editingProduct, setEditingProduct] = useState<{ id: number } | null>(null)
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productDescount, setProductDescount] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [productStock, setProductStock] = useState("")
  const [productIsActive, setProductIsActive] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(8)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const filteredProducts = products
    .filter(product => selectedCategory === "Todos" || product.category === selectedCategory)
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProducts(products.map(p => 
      editingProduct && p.id === editingProduct.id 
        ? { ...p, name: productName, description: productDescription, price: parseFloat(productPrice), descount: parseFloat(productDescount), category: productCategory }
        : p
    ))
    setIsEditDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setProductName("")
    setProductDescription("")
    setProductPrice("")
    setProductDescount("")
    setProductCategory("")
    setEditingProduct(null)
  }

  const startEditing = (product: any) => {
    setEditingProduct(product)
    setProductName(product.name)
    setProductDescription(product.description)
    setProductPrice(product.price)
    setProductDescount(product.descount)
    setProductCategory(product.category)
    setIsEditDialogOpen(true)
  }


  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm]);

  return (
    <div>
    <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <Select value={productsPerPage.toString()} onValueChange={(value) => setProductsPerPage(Number(value))}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Productos por página" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="8">8 por página</SelectItem>
                <SelectItem value="12">12 por página</SelectItem>
                <SelectItem value="16">16 por página</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
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
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
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
          ))}
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          onPageChange={paginate}
        />
      </div>
  );
}
