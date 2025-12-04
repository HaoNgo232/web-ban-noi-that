"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

const categories = [
  { value: "", label: "Tất cả" },
  { value: "living-room", label: "Phòng khách" },
  { value: "bedroom", label: "Phòng ngủ" },
  { value: "dining", label: "Phòng ăn" },
  { value: "office", label: "Văn phòng" },
]

interface ProductFiltersProps {
  filters: {
    category: string
    priceRange: [number, number]
    inStock: boolean
  }
  onFiltersChange: (filters: any) => void
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Danh mục</h3>
        <RadioGroup
          value={filters.category}
          onValueChange={(value) => onFiltersChange({ ...filters, category: value })}
        >
          {categories.map((category) => (
            <div key={category.value} className="flex items-center space-x-2">
              <RadioGroupItem value={category.value} id={category.value} />
              <Label htmlFor={category.value} className="text-sm font-normal cursor-pointer">
                {category.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Price Range Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Khoảng giá</h3>
        <div className="space-y-4">
          <Slider
            min={0}
            max={50000000}
            step={1000000}
            value={filters.priceRange}
            onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value as [number, number] })}
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Availability Filter */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Tình trạng</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={filters.inStock}
            onCheckedChange={(checked) => onFiltersChange({ ...filters, inStock: checked })}
          />
          <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
            Chỉ hiển thị sản phẩm còn hàng
          </Label>
        </div>
      </div>
    </div>
  )
}
