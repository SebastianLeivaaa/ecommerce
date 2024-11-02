import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight, Home } from "lucide-react";
import { Category } from "@/models/categoryModel";

export const CategoryFilter = ({ categories, rootCategory, onValueChange }: { categories: Category[], rootCategory: Category[], onValueChange: (value: Category | null) => void}) => {

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="outline" size="sm" onClick={() => onValueChange(null)}>
          <Home className="h-4 w-4" />
        </Button>
        <ChevronRight className="h-4 w-4" />
        {rootCategory.map((category, index) => (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onValueChange(category)}
            >
              {category.name}
            </Button>
            {index < rootCategory.length - 1 && <ChevronRight className="h-4 w-4" />}
          </>
        ))}
      </div>
      {categories.length > 0 && (
        <>
          <h2 className="font-bold text-xl">Categorias</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onValueChange(category)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
