import { Skeleton } from "@/components/ui/skeleton";

export function CollectionsLoadingSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
        </div>
      </section>

      {/* Collections Grid Skeleton */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-[4/3] w-full rounded-lg mb-6" />
                <Skeleton className="h-8 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-10 w-40" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


