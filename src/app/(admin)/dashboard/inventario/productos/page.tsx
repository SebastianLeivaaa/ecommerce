// app/dashboard/products/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/dashboard/products/productCard"
import { PaginationControls } from "@/components/dashboard/shared/paginationControls"
import { Product } from "@/models/productModel"
import { useProducts } from "@/hooks/products/useProducts"
import axios from 'axios';


// Productos de ejempl

const categories = ["Todos", "electronics", "clothing", "books"]


export default function ProductsPage() {

  const { data: products = [], isLoading, isError } = useProducts(); // Utiliza useProducts
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



  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm]);



  if (isLoading) {
    return <div>Cargando productos...</div>;
  }

  if (isError) {
    return <div>Error al cargar productos.</div>;
  }

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
