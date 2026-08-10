function CategoryCard({ category, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(category.id)}
      className="group relative h-48 rounded-lg overflow-hidden card-shadow-hover transition-all block w-full text-left"
      aria-label={`Categoria ${category.name}`}
    >
      <img
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        src={category.image}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
        <h3 className="text-white font-headline-md text-2xl">{category.name}</h3>
      </div>
    </button>
  )
}

export default CategoryCard
