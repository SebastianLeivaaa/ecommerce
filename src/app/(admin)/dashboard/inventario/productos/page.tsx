// app/dashboard/products/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/dashboard/products/productCard"
import { PaginationControls } from "@/components/dashboard/shared/paginationControls"
import { useProducts } from "@/hooks/products/useProducts"
import { ProductCardSkeleton } from "@/components/dashboard/products/productCardSkeleton"
import { NoProductsFound } from "@/components/dashboard/products/noProductsFound"

// Productos de ejempl

const categories = ["Todos", "electronics", "clothing", "books"]


export default function ProductsPage() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage, setProductsPerPage] = useState(8)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [activeFilter, setActiveFilter] = useState(searchParams.get("active") || "true");
  const { data: products = [], isLoading, isError } = useProducts({ active: activeFilter});
  const [sortBy, setSortBy] = useState("rating")
  const [sortOrder, setSortOrder] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const filteredProducts = products
    .filter(product => selectedCategory === "Todos" || product.category === selectedCategory)
    .filter(product => product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleFilterChange = (newActiveFilter: string) => {
    setActiveFilter(newActiveFilter);

    if (newActiveFilter === "all") {
      newActiveFilter = "";
      router.push(`/dashboard/inventario/productos`);
    } else {
      router.push(`/dashboard/inventario/productos?active=${newActiveFilter}`);
    }
  };



  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchTerm]);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
        <div className="lg:flex items-center gap-4 grid grid-cols-2">
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm w-[180px]"
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
        <div className="lg:flex items-center gap-4 grid grid-cols-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Valoración</SelectItem>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="price">Precio</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Orden" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascendente</SelectItem>
                <SelectItem value="desc">Descendente</SelectItem>
              </SelectContent>
            </Select>
            <Select value={activeFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="true">Activos</SelectItem>
                <SelectItem value="false">Inactivos</SelectItem>
              </SelectContent>
            </Select>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {isLoading ? (
          <>
            {[...Array(productsPerPage)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </>
        ) : currentProducts.length === 0 ? (
          <div className="col-span-full">
            <NoProductsFound />
          </div>
        ) : (
          <>
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        )}
      </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          onPageChange={paginate}
        />
      </>
  );
}
