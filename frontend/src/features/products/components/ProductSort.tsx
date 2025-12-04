import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Grid3x3, List } from "lucide-react";

type SortBy = "price" | "createdAt" | "name";
type SortOrder = "asc" | "desc";
export type ViewMode = "grid" | "list";

interface ProductSortProps {
    readonly sortBy?: SortBy;
    readonly sortOrder?: SortOrder;
    readonly viewMode: ViewMode;
    readonly onSortChange: (sortBy: SortBy, sortOrder: SortOrder) => void;
    readonly onViewModeChange: (mode: ViewMode) => void;
}

export function ProductSort({
    sortBy = "createdAt",
    sortOrder = "desc",
    viewMode,
    onSortChange,
    onViewModeChange,
}: ProductSortProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sắp xếp theo:</span>
                <Select
                    value={`${sortBy}-${sortOrder}`}
                    onValueChange={(value) => {
                        const [by, order] = value.split("-") as [SortBy, SortOrder];
                        onSortChange(by, order);
                    }}
                >
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="createdAt-desc">Mới nhất</SelectItem>
                        <SelectItem value="createdAt-asc">Cũ nhất</SelectItem>
                        <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                        <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
                        <SelectItem value="name-asc">Tên: A-Z</SelectItem>
                        <SelectItem value="name-desc">Tên: Z-A</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => onViewModeChange("grid")}
                >
                    <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => onViewModeChange("list")}
                >
                    <List className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

