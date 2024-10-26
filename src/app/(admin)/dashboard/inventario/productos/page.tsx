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
import { ProductCard } from "@/components/dashboard/products/productCard"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { StockBadge } from "@/components/dashboard/products/stockBadge"
import { PaginationControls } from "@/components/dashboard/shared/paginationControls"
import { Product } from "@/models/productModel"
import axios from 'axios';


// Productos de ejemplo

const categories = ["Todos", "electronics", "clothing", "books"]


export default function ProductsPage() {

  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(8)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchTerm, setSearchTerm] = useState("")
  const filteredProducts = products
    .filter(product => selectedCategory === "Todos" || product.category === selectedCategory)
    .filter(product => product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  /*const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProducts(products.map(p => 
      editingProduct && p.id === editingProduct.id 
        ? { ...p, name: productName, description: productDescription, price: parseFloat(productPrice), descount: parseFloat(productDescount), category: productCategory }
        : p
    ))
    setIsEditDialogOpen(false)
    resetForm()
  }*/


  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };


  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    fetchProducts();
  }, []);

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
        {currentProducts && currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
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
