// components/PaginationControls.tsx
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function PaginationControls({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (pageNumber: number) => void }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <Button variant="outline" size="icon" onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pageNumbers.map((number) => (
        <Button key={number} variant={currentPage === number ? "default" : "outline"} size="icon" onClick={() => onPageChange(number)}>
          {number}
        </Button>
      ))}
      <Button variant="outline" size="icon" onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
