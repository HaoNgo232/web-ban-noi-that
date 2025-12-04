"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductSortProps {
  value: string
  onChange: (value: string) => void
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sắp xếp" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="featured">Nổi bật</SelectItem>
        <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
        <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
        <SelectItem value="name-asc">Tên: A đến Z</SelectItem>
        <SelectItem value="name-desc">Tên: Z đến A</SelectItem>
        <SelectItem value="newest">Mới nhất</SelectItem>
      </SelectContent>
    </Select>
  )
}
