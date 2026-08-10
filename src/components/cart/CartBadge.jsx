function CartBadge({ count }) {
  if (!count) return null
  return (
    <span
      className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-on-primary font-label-bold text-[10px] flex items-center justify-center"
      aria-label={`${count} itens na sacola`}
    >
      {count}
    </span>
  )
}

export default CartBadge
