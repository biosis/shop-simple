interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline'
  size?: 'sm' | 'md'
  children: React.ReactNode
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-gray-100 text-gray-700',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
  outline: 'border border-border text-text-muted bg-transparent',
}

const sizeClasses: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'text-xs',
  md: 'text-sm',
}

export function Badge({
  variant = 'default',
  size = 'sm',
  children,
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full font-medium px-2.5 py-0.5',
        variantClasses[variant],
        sizeClasses[size],
      ].join(' ')}
    >
      {children}
    </span>
  )
}
