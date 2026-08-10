import { useCart } from '../contexts/CartContext'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import EmptyCartState from '../components/cart/EmptyCartState'

function Cart() {
  const { items, cartTotal, cartCount, removeItem, updateQty, deliveryType, setDelivery } =
    useCart()

  if (items.length === 0) {
    return <EmptyCartState />
  }

  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-margin-desktop py-8 md:py-stack-loose">
      <h1 className="font-headline-lg text-on-surface mb-6 md:mb-stack-loose">Minha Sacola</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-stack-loose">
        <div className="lg:col-span-8 flex flex-col gap-6 md:gap-gutter">
          {items.map((item) => (
            <CartItem
              key={item.key}
              item={item}
              onUpdateQty={updateQty}
              onRemove={removeItem}
            />
          ))}
        </div>

        <div className="lg:col-span-4">
          <CartSummary
            itemCount={cartCount}
            subtotal={cartTotal}
            deliveryType={deliveryType}
            onSetDelivery={setDelivery}
          />
        </div>
      </div>
    </main>
  )
}

export default Cart
