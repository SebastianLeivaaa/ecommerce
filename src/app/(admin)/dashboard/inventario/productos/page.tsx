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
import { useCategories } from "@/hooks/categories/useCategories";
import { CategoryFilter } from "@/components/dashboard/categories/categoryFIlter";
import { Category } from "@/models/categoryModel";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [categoryParentId, setCategoryParentId] = useState<string | null>(null);
  
  const { data: categoryData } = useCategories(categoryParentId);
  const categories = [...(categoryData || [])];

  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [productsPerPage, setProductsPerPage] = useState(Number(searchParams.get("productsPerPage")) || 8);
  const [activeFilter, setActiveFilter] = useState(searchParams.get("active") || "all");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "desc");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "rating");
  const [rootCategory, setRootCategory] = useState<Category[]>([]);

  const { data, isLoading } = useProducts({
    sortOrder,
    active: activeFilter,
    sortBy,
    page: currentPage,
    productsPerPage,
    category: searchQuery ? null : categoryParentId, // Ignora categoría si hay término de búsqueda
    searchTerm: searchQuery, // Pasa searchTerm al hook de productos
  });

  const products = data?.products || [];
  const totalProducts = data?.totalProducts || 0;

  // Actualiza la URL cuando cambian filtros o búsqueda
  useEffect(() => {
    const urlParams = new URLSearchParams();
    if (activeFilter && activeFilter !== "all") urlParams.append("active", activeFilter);
    if (sortBy) urlParams.append("sortBy", sortBy);
    if (sortOrder) urlParams.append("sortOrder", sortOrder);
    if (currentPage) urlParams.append("page", currentPage.toString());
    if (productsPerPage) urlParams.append("productsPerPage", productsPerPage.toString());
    if (categoryParentId && !searchQuery) urlParams.append("category", categoryParentId); // Solo si no hay búsqueda
    if (searchQuery) urlParams.append("searchTerm", searchQuery);

    router.push(`/dashboard/inventario/productos?${urlParams.toString()}`);
  }, [activeFilter, sortBy, sortOrder, currentPage, productsPerPage, router, categoryParentId, searchQuery]);

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

  const handleCategoryParentIdChange = (value?: Category | null) => {
    if (!value) {
      setCategoryParentId(null);
      setRootCategory([]);
      return;
    }

    setCategoryParentId(value.id);
    const existingIndex = rootCategory.findIndex((cat) => cat.id === value.id);

    if (existingIndex !== -1) {
      setRootCategory(rootCategory.slice(0, existingIndex + 1));
    } else {
      setRootCategory([...rootCategory, value]);
    }
  };

  // Manejar el evento de buscar al presionar Enter
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateSearchTerm();
    }
  };

  // Función para actualizar el término de búsqueda
  const updateSearchTerm = () => {
    setSearchQuery(searchTerm);
  };

  
  
  //Funcion para limpiar el termino de busqueda
  const clearSearchTerm = () => {
    setSearchQuery("");
    setSearchTerm("");
    setActiveFilter("all");
    setSortOrder("desc");
    setSortBy("rating");
    setCurrentPage(1);
    setProductsPerPage(8);
    setCategoryParentId(null);
    setRootCategory([]);

  };
  
  useEffect(() => {
    if (searchQuery === "") {
      router.push(`/dashboard/inventario/productos`);
    }
  }, [searchQuery, router]);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative w-full lg:w-64">
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Solo actualiza el estado
            onKeyDown={handleSearchKeyDown} // Maneja el evento de Enter
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full"
            onClick={updateSearchTerm}
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Buscar</span>
          </Button>
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
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
            {!searchQuery ? (
              <CategoryFilter categories={categories} rootCategory={rootCategory} onValueChange={handleCategoryParentIdChange}/>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearSearchTerm}
                >
                  Limpiar búsqueda
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          <div className="mb-4 text-sm text-muted-foreground">
            Se encontraron {totalProducts} productos
          </div>
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {isLoading
          ? Array.from({ length: productsPerPage }, (_, index) => <ProductCardSkeleton key={index} />)
          : products.length === 0
          ? <div className="col-span-full">
              <NoProductsFound />
            </div>
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(totalProducts / productsPerPage)}
        onPageChange={(currentPage) => updateFilter("page", "", currentPage)}
      />
    </>
  );
}
