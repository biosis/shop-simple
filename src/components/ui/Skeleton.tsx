interface SkeletonProps {
  width?: string
  height?: string
  rounded?: boolean
  className?: string
}

export function Skeleton({
  width,
  height,
  rounded = false,
  className = '',
}: SkeletonProps) {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .skeleton-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
      `}</style>
      <div
        aria-hidden="true"
        className={[
          'skeleton-shimmer',
          rounded ? 'rounded-full' : 'rounded-md',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ width, height }}
      />
    </>
  )
}
