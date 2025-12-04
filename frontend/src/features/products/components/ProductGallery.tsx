import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
    readonly images?: string[];
    readonly productName: string;
}

export function ProductGallery({ images = [], productName }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (images.length === 0) {
        return (
            <AspectRatio ratio={1} className="bg-muted rounded-lg">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    Không có hình ảnh
                </div>
            </AspectRatio>
        );
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative">
                <AspectRatio ratio={1} className="bg-muted rounded-lg overflow-hidden">
                    <img
                        src={images[selectedIndex]}
                        alt={`${productName} - Hình ${selectedIndex + 1}`}
                        className="w-full h-full object-cover"
                    />
                </AspectRatio>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={`${image}-${index}`}
                            type="button"
                            onClick={() => setSelectedIndex(index)}
                            className={cn(
                                "relative aspect-square rounded-md overflow-hidden border-2 transition-all",
                                selectedIndex === index
                                    ? "border-primary"
                                    : "border-transparent hover:border-muted-foreground/50",
                            )}
                        >
                            <img
                                src={image}
                                alt={`${productName} - Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

