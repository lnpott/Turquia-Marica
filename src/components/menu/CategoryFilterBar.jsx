const ALL = { id: 'todos', name: 'Todos' }

function CategoryFilterBar({ categories, active, onSelect }) {
  const chipClasses = (isActive) =>
    `shrink-0 snap-start inline-flex min-h-11 items-center gap-2 rounded-sm px-5 py-2 font-label-bold text-label-bold ring-1 ring-inset transition-colors ${
      isActive ? 'bg-on-surface text-white ring-on-surface' : 'bg-transparent text-on-surface-variant ring-[#d9cdbd] hover:text-primary'
    }`

  return (
    <div
      role="group"
      aria-label="Filtrar por categoria"
      className="scrolling-wrapper flex snap-x snap-mandatory gap-3 overflow-x-auto py-2"
    >
      {[ALL, ...categories].map((category) => {
        const isActive = active === category.id
        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(category.id)}
            className={chipClasses(isActive)}
          >
            {category.image && (
              <img
                alt=""
                className="h-8 w-8 rounded-full object-cover"
                src={category.image}
                aria-hidden="true"
                width="32"
                height="32"
                loading="lazy"
              />
            )}
            {category.name}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilterBar
