export function ProductsLoadingSkeleton() {
  return (
    <div className="container px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="h-12 w-64 bg-muted animate-pulse rounded" />
        <div className="h-6 w-96 bg-muted animate-pulse rounded" />
      </div>

      <div className="flex gap-8">
        <div className="hidden lg:block w-64 shrink-0 space-y-6">
          <div className="h-64 bg-muted animate-pulse rounded" />
        </div>

        <div className="flex-1">
          <div className="h-12 bg-muted animate-pulse rounded mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-muted animate-pulse rounded-lg" />
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
