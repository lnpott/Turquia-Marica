import { useEffect, useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products, addons as allAddons, removals as allRemovals, meatPoints } from '../data/menu'
import { formatBRL } from '../utils/format'
import { useCart } from '../contexts/CartContext'
import ProductHero from '../components/product/ProductHero'
import AddonsSelector from '../components/product/AddonsSelector'
import ObservationsField from '../components/product/ObservationsField'
import AddToCartBar from '../components/product/AddToCartBar'
import Button from '../components/ui/Button'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === id)
  const { addItem } = useCart()

  const [qty, setQty] = useState(1)
  const [meatPoint, setMeatPoint] = useState('ao-ponto')
  const [selectedAddons, setSelectedAddons] = useState([])
  const [selectedRemovals, setSelectedRemovals] = useState([])
  const [observations, setObservations] = useState('')

  // Reseta a personalização sempre que o produto (id) mudar, evitando que
  // opcionais/quantidade de um produto "vazem" para outro.
  useEffect(() => {
    setQty(1)
    setMeatPoint('ao-ponto')
    setSelectedAddons([])
    setSelectedRemovals([])
    setObservations('')
  }, [product?.id])

  const showMeatPoint = Boolean(product?.hasMeatPoint)
  const availableAddons = allAddons.filter((a) => product?.allowedAddons?.includes(a.id))
  const availableRemovals = allRemovals.filter((r) => product?.allowedRemovals?.includes(r.id))

  const addonsTotal = useMemo(
    () =>
      availableAddons
        .filter((a) => selectedAddons.includes(a.id))
        .reduce((sum, a) => sum + a.price, 0),
    [availableAddons, selectedAddons],
  )

  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((a) => a !== addonId) : [...prev, addonId],
    )
  }

  const toggleRemoval = (removalId) => {
    setSelectedRemovals((prev) =>
      prev.includes(removalId) ? prev.filter((r) => r !== removalId) : [...prev, removalId],
    )
  }

  // Chave única do item: personalizações diferentes (ponto da carne, adicionais,
  // remoções, observações) geram itens distintos na sacola — nunca são mesclados.
  const signature = useMemo(
    () =>
      [
        product?.id,
        showMeatPoint ? meatPoint : 'sem-ponto',
        [...selectedAddons].sort().join('+'),
        [...selectedRemovals].sort().join('+'),
        observations.trim(),
      ].join('::'),
    [product?.id, showMeatPoint, meatPoint, selectedAddons, selectedRemovals, observations],
  )

  // Lote 6: adiciona à sacola via CartContext preservando todas as escolhas e
  // encaminha para /sacola (UX definida no plano/Stitch).
  const handleAdd = () => {
    if (!product) return
    const item = {
      key: signature,
      id: product.id,
      name: product.name,
      image: product.image,
      unitPrice: (product.priceValue ?? 0) + addonsTotal,
      qty,
      // Só registra o ponto da carne quando o usuário escolheu algo além do
      // default — evita exibir "Ao ponto" na sacola sem ação do usuário.
      meatPoint:
        showMeatPoint && meatPoint !== 'ao-ponto'
          ? meatPoints.find((m) => m.id === meatPoint)?.label
          : null,
      addons: availableAddons.filter((a) => selectedAddons.includes(a.id)).map((a) => a.label),
      removals: availableRemovals
        .filter((r) => selectedRemovals.includes(r.id))
        .map((r) => r.label),
      observations: observations.trim(),
    }
    addItem(item)
    navigate('/sacola')
  }

  if (!product) {
    return (
      <section
        className="flex flex-col items-center justify-center gap-stack-loose px-margin-mobile py-margin-desktop text-center"
        style={{ minHeight: '60vh' }}
      >
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Produto não encontrado</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
          O produto que você procura não existe ou foi removido do cardápio.
        </p>
        <Button to="/cardapio" size="lg">
          Voltar ao Cardápio
        </Button>
      </section>
    )
  }

  const unitTotal = (product.priceValue ?? 0) + addonsTotal
  const total = unitTotal * qty

  return (
    <>
      <ProductHero product={product} unitTotal={unitTotal} />

      <section className="w-full bg-surface-container-low px-margin-mobile md:px-margin-desktop py-8 md:py-stack-loose pb-28 md:pb-0">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-stack-loose items-start">
          <div className="lg:col-span-7 flex flex-col gap-8">
            {showMeatPoint && (
              <fieldset className="flex flex-col gap-3">
                <legend className="font-label-bold text-label-bold text-on-surface mb-1">
                  Ponto da carne
                </legend>
                <div className="flex flex-wrap gap-2">
                  {meatPoints.map((point) => (
                    <label
                      key={point.id}
                      className={`cursor-pointer px-4 py-2 rounded-full border font-label-bold transition-colors ${
                        meatPoint === point.id
                          ? 'border-primary bg-primary text-on-primary'
                          : 'border-outline-variant bg-surface text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      <input
                        type="radio"
                        name="meat-point"
                        value={point.id}
                        checked={meatPoint === point.id}
                        onChange={() => setMeatPoint(point.id)}
                        className="sr-only"
                      />
                      {point.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {availableAddons.length > 0 && (
              <AddonsSelector
                title="Adicionais"
                options={availableAddons}
                selected={selectedAddons}
                onToggle={toggleAddon}
                showPrice
              />
            )}

            {availableRemovals.length > 0 && (
              <AddonsSelector
                title="Remover ingredientes"
                options={availableRemovals}
                selected={selectedRemovals}
                onToggle={toggleRemoval}
              />
            )}

            <ObservationsField value={observations} onChange={setObservations} />
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-xl shadow-lg p-6 md:p-stack-loose lg:sticky lg:top-[104px] border border-surface-variant bg-surface">
              <h2 className="font-headline-md text-on-surface mb-gutter border-b border-surface-variant pb-4">
                Resumo
              </h2>
              <dl className="flex flex-col gap-2 mb-gutter font-body-md text-on-surface-variant">
                <div className="flex justify-between">
                  <dt>
                    {product.name} × {qty}
                  </dt>
                  <dd>{formatBRL((product.priceValue ?? 0) * qty)}</dd>
                </div>
                {availableAddons
                  .filter((a) => selectedAddons.includes(a.id))
                  .map((a) => (
                    <div key={a.id} className="flex justify-between">
                      <dt>+ {a.label}</dt>
                      <dd>{formatBRL(a.price * qty)}</dd>
                    </div>
                  ))}
                {showMeatPoint && meatPoint !== 'ao-ponto' && (
                  <div className="flex justify-between">
                    <dt>Ponto da carne</dt>
                    <dd>{meatPoints.find((m) => m.id === meatPoint)?.label}</dd>
                  </div>
                )}
                {selectedRemovals.length > 0 && (
                  <div className="flex justify-between">
                    <dt>Sem</dt>
                    <dd>
                      {availableRemovals
                        .filter((r) => selectedRemovals.includes(r.id))
                        .map((r) => r.label)
                        .join(', ')}
                    </dd>
                  </div>
                )}
                {observations && (
                  <div className="flex justify-between">
                    <dt>Obs.</dt>
                    <dd className="text-right max-w-[60%]">{observations}</dd>
                  </div>
                )}
              </dl>

              <AddToCartBar qty={qty} onChangeQty={setQty} total={total} onAdd={handleAdd} />
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

export default ProductDetails
