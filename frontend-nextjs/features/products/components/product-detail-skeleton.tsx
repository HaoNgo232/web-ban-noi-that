export function ProductDetailSkeleton() {
  return (
    <div className="container px-4 py-8">
      <div className="h-6 w-96 bg-muted animate-pulse rounded mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-muted animate-pulse rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          <div className="h-12 w-full bg-muted animate-pulse rounded" />
          <div className="h-10 w-40 bg-muted animate-pulse rounded" />
          <div className="h-px bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
