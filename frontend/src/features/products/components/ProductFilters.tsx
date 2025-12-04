import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductCategory } from "@/types/product.types";
import { X } from "lucide-react";

interface ProductFiltersProps {
    readonly category?: ProductCategory;
    readonly minPrice?: number;
    readonly maxPrice?: number;
    readonly material?: string;
    readonly onCategoryChange: (category: ProductCategory | undefined) => void;
    readonly onPriceChange: (min?: number, max?: number) => void;
    readonly onMaterialChange: (material: string | undefined) => void;
    readonly onReset: () => void;
}

export function ProductFilters({
    category,
    minPrice,
    maxPrice,
    material,
    onCategoryChange,
    onPriceChange,
    onMaterialChange,
    onReset,
}: ProductFiltersProps) {
    const hasFilters = category || minPrice || maxPrice || material;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Bộ lọc</CardTitle>
                    {hasFilters && (
                        <Button variant="ghost" size="sm" onClick={onReset}>
                            <X className="h-4 w-4 mr-1" />
                            Xóa bộ lọc
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Category Filter */}
                <div className="space-y-2">
                    <Label>Danh mục</Label>
                    <Select
                        value={category || ""}
                        onValueChange={(value) =>
                            onCategoryChange(value ? (value as ProductCategory) : undefined)
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Tất cả danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="">Tất cả danh mục</SelectItem>
                            <SelectItem value={ProductCategory.SOFA}>Sofa</SelectItem>
                            <SelectItem value={ProductCategory.TABLE}>Bàn</SelectItem>
                            <SelectItem value={ProductCategory.CHAIR}>Ghế</SelectItem>
                            <SelectItem value={ProductCategory.BED}>Giường</SelectItem>
                            <SelectItem value={ProductCategory.CABINET}>Tủ</SelectItem>
                            <SelectItem value={ProductCategory.SHELF}>Kệ</SelectItem>
                            <SelectItem value={ProductCategory.LIGHTING}>Đèn</SelectItem>
                            <SelectItem value={ProductCategory.DECORATION}>
                                Trang trí
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Separator />

                {/* Price Range Filter */}
                <div className="space-y-2">
                    <Label>Khoảng giá</Label>
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            placeholder="Từ"
                            value={minPrice || ""}
                            onChange={(e) =>
                                onPriceChange(
                                    e.target.value ? Number(e.target.value) : undefined,
                                    maxPrice,
                                )
                            }
                        />
                        <Input
                            type="number"
                            placeholder="Đến"
                            value={maxPrice || ""}
                            onChange={(e) =>
                                onPriceChange(
                                    minPrice,
                                    e.target.value ? Number(e.target.value) : undefined,
                                )
                            }
                        />
                    </div>
                </div>

                <Separator />

                {/* Material Filter */}
                <div className="space-y-2">
                    <Label>Chất liệu</Label>
                    <Input
                        placeholder="Ví dụ: Gỗ, Nhựa, Kim loại"
                        value={material || ""}
                        onChange={(e) =>
                            onMaterialChange(e.target.value || undefined)
                        }
                    />
                </div>
            </CardContent>
        </Card>
    );
}

