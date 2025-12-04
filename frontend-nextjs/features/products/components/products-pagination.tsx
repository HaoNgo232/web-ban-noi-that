"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductsPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function ProductsPagination({ currentPage, totalPages, onPageChange }: ProductsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Show max 5 pages at a time
  const visiblePages = pages.slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {visiblePages[0] > 1 && (
        <>
          <Button variant="outline" onClick={() => onPageChange(1)}>
            1
          </Button>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {visiblePages.map((page) => (
        <Button key={page} variant={currentPage === page ? "default" : "outline"} onClick={() => onPageChange(page)}>
          {page}
        </Button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span className="px-2">...</span>}
          <Button variant="outline" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
