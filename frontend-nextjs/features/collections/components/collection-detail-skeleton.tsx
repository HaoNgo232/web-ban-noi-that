import { Skeleton } from "@/components/ui/skeleton"

export function CollectionDetailSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <section className="h-[50vh] md:h-[60vh]">
        <Skeleton className="w-full h-full" />
      </section>

      {/* Products Grid Skeleton */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-square w-full rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
