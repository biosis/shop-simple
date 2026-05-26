import { Skeleton } from '@/components/ui'

export default function ProductsLoading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10 space-y-2">
        <Skeleton width="240px" height="36px" />
        <Skeleton width="320px" height="20px" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden border border-border">
            <Skeleton width="100%" height="240px" />
            <div className="p-4 space-y-3">
              <Skeleton width="70%" height="20px" />
              <Skeleton width="100%" height="16px" />
              <Skeleton width="40%" height="20px" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
