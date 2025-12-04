import { useState, useEffect, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    readonly src: string;
    readonly alt: string;
    readonly className?: string;
    readonly fallback?: string;
    readonly showSkeleton?: boolean;
}

/**
 * Optimized image component with lazy loading, error handling, and loading states
 */
export function OptimizedImage({
    src,
    alt,
    className,
    fallback = "/placeholder-image.png",
    showSkeleton = true,
    ...props
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [imageSrc, setImageSrc] = useState(src);

    // Reset state when src prop changes
    useEffect(() => {
        setIsLoading(true);
        setHasError(false);
        setImageSrc(src);
    }, [src]);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
        if (imageSrc !== fallback) {
            setImageSrc(fallback);
        }
    };

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {isLoading && showSkeleton && (
                <Skeleton className="absolute inset-0 w-full h-full" />
            )}
            <img
                src={imageSrc}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={handleLoad}
                onError={handleError}
                className={cn(
                    "transition-opacity duration-300",
                    isLoading ? "opacity-0" : "opacity-100",
                    hasError && "object-contain",
                    className,
                )}
                {...props}
            />
        </div>
    );
}

