const ALL = { id: 'todos', name: 'Todos' }

function CategoryFilterBar({ categories, active, onSelect }) {
  const chipClasses = (isActive) =>
    `shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 font-label-bold text-label-bold transition-colors ${
      isActive ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:text-primary'
    }`

  return (
    <div
      role="group"
      aria-label="Filtrar por categoria"
      className="scrolling-wrapper overflow-x-auto flex gap-3 py-2"
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
                className="w-8 h-8 rounded-full object-cover"
                src={category.image}
                aria-hidden="true"
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
