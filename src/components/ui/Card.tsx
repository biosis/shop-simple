import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'clickable'
  children: React.ReactNode
}

const variantClasses: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'shadow-sm',
  flat: '',
  clickable:
    'shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 cursor-pointer',
}

export function Card({
  variant = 'default',
  className = '',
  children,
  ...props
}: CardProps) {
  const isClickable = variant === 'clickable'

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={[
        'bg-white rounded-lg border border-border',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
