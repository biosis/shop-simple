interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap: Record<NonNullable<SpinnerProps['size']>, number> = {
  sm: 16,
  md: 20,
  lg: 24,
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const px = sizeMap[size]
  const strokeWidth = 2
  const r = (px - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * r

  return (
    <svg
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      className={['[animation:spin_0.8s_linear_infinite]', className]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <circle
        cx={px / 2}
        cy={px / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeOpacity={0.25}
      />
      <circle
        cx={px / 2}
        cy={px / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
        strokeLinecap="round"
      />
    </svg>
  )
}
