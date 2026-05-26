import { Skeleton } from '@/components/ui'

export default function ProductLoading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-3">
          <div className="aspect-square">
            <Skeleton width="100%" height="100%" />
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width="64px" height="64px" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Skeleton width="80px" height="24px" rounded />
          <Skeleton width="65%" height="40px" />
          <Skeleton width="110px" height="36px" />
          <Skeleton width="100%" height="96px" />
          <Skeleton width="100%" height="52px" />
          <Skeleton width="150px" height="16px" />
        </div>
      </div>
    </main>
  )
}
