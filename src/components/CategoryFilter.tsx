'use client'

interface CategoryFilterProps {
  categories: string[]
  selected: string
  onChange: (cat: string) => void
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  const all = ['Tous', ...categories]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {all.map((cat) => {
        const active = cat === selected
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={[
              'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
              active
                ? 'bg-accent text-white'
                : 'border border-border text-text-muted hover:bg-surface-hover',
            ].join(' ')}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
