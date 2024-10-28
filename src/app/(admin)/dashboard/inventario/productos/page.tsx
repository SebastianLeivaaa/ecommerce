"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/dashboard/products/productCard";
import { PaginationControls } from "@/components/dashboard/shared/paginationControls";
import { useProducts } from "@/hooks/products/useProducts";
import { ProductCardSkeleton } from "@/components/dashboard/products/productCardSkeleton";
import { NoProductsFound } from "@/components/dashboard/products/noProductsFound";

// Lista de categorías de ejemplo
const categories = ["Todos", "electronics", "clothing", "books"];

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estados de filtro
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [productsPerPage, setProductsPerPage] = useState(Number(searchParams.get("productsPerPage")) || 8);
  const [activeFilter, setActiveFilter] = useState(searchParams.get("active") || "all");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "desc");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "rating");

  const { data, isLoading, error } = useProducts({ 
    sortOrder, 
    active: activeFilter, 
    sortBy, 
    page: currentPage, 
    productsPerPage 
  });

  const products = data?.products || [];
  const totalProducts = data?.totalProducts || 0;
  
  const filteredProducts = products
    .filter(product => selectedCategory === "Todos" || product.category === selectedCategory)
    .filter(product => product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLastProduct = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfLastProduct - productsPerPage, indexOfLastProduct);

  // useEffect para actualizar la URL cuando cambien los filtros
  useEffect(() => {
    const urlParams = new URLSearchParams();
    if (activeFilter && activeFilter !== "all") urlParams.append("active", activeFilter);
    if (sortBy) urlParams.append("sortBy", sortBy);
    if (sortOrder) urlParams.append("sortOrder", sortOrder);
    if (currentPage) urlParams.append("page", currentPage.toString());
    if (productsPerPage) urlParams.append("productsPerPage", productsPerPage.toString());
    router.push(`/dashboard/inventario/productos?${urlParams.toString()}`);
  }, [activeFilter, sortBy, sortOrder, currentPage, productsPerPage, router]);

  const updateFilter = (filterType: string, value: string, page: number) => {
    switch (filterType) {
      case "active":
        setActiveFilter(value);
        break;
      case "sortOrder":
        setSortOrder(value);
        break;
      case "sortBy":
        setSortBy(value);
        break;
      case "page":
        setCurrentPage(page);
        break;
      case "productsPerPage":
        setCurrentPage(1);
        setProductsPerPage(Number(value));
        break;
      default:
        break;
    }
  };

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
          <Select value={sortBy} onValueChange={(value) => updateFilter("sortBy", value, currentPage)}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Valoración</SelectItem>
              <SelectItem value="stock">Stock</SelectItem>
              <SelectItem value="price">Precio</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={(value) => updateFilter("sortOrder", value, currentPage)}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Orden" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascendente</SelectItem>
              <SelectItem value="desc">Descendente</SelectItem>
            </SelectContent>
          </Select>
          <Select value={activeFilter} onValueChange={(value) => updateFilter("active", value, currentPage)}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="true">Activos</SelectItem>
              <SelectItem value="false">Inactivos</SelectItem>
            </SelectContent>
          </Select>
          <Select value={productsPerPage.toString()} onValueChange={(value) => updateFilter("productsPerPage", value, currentPage)}>
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
        {isLoading
          ? Array.from({ length: productsPerPage }, (_, index) => <ProductCardSkeleton key={index} />)
          : filteredProducts.length === 0
          ? <div className="col-span-full">
              <NoProductsFound />
            </div>
          : filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(totalProducts / productsPerPage)}
        onPageChange={(currentPage) => updateFilter("page", "", currentPage)}
      />
    </>
  );
}
