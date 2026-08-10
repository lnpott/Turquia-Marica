import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import Button from '../components/ui/Button'
import SuccessIcon from '../components/confirmation/SuccessIcon'
import OrderSummaryConfirm from '../components/confirmation/OrderSummaryConfirm'
import WhatsAppButton from '../components/confirmation/WhatsAppButton'

// /confirmacao — Lote 8. Migração do HTML de produção
// (turquia_lanches_confirma_o_production/code.html). Exibe o snapshot do pedido
// (lastOrder, gravado pelo PLACE_ORDER no checkout) — a sacola já foi limpa,
// mas os dados da confirmação permanecem. Fluxo linear: sem BottomNavBar
// (mesmo layout routes do /checkout).
function Confirmation() {
  const { lastOrder } = useCart()

  // Acesso direto/refresh sem pedido concluído (sem persistência ainda — a
  // persistência real fica para os próximos lotes).
  if (!lastOrder) {
    return (
      <section
        className="flex flex-col items-center justify-center gap-stack-loose px-margin-mobile py-margin-desktop text-center"
        style={{ minHeight: '60vh' }}
      >
        <span className="material-symbols-outlined text-6xl text-outline" aria-hidden="true">
          receipt_long
        </span>
        <h1 className="font-headline-lg text-headline-lg text-on-surface">Nenhum pedido encontrado</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
          Volte ao cardápio e faça seu pedido para acompanhar a confirmação aqui.
        </p>
        <Button to="/cardapio" size="lg">
          Ver Cardápio
        </Button>
      </section>
    )
  }

  return (
    <main className="flex-grow flex items-center justify-center py-16 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-2xl w-full mx-auto text-center space-y-stack-loose">
        {/* Sucesso visual e mensagem */}
        <div className="space-y-stack-tight flex flex-col items-center">
          <SuccessIcon />
          <h1 className="font-display-xl text-display-xl-mobile md:text-display-xl text-primary">
            Pedido Recebido com Sucesso!
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
            Obrigado pelo seu pedido! Estamos preparando seu lanche com todo carinho e aquele sabor
            inconfundível.
          </p>
        </div>

        {/* Card do pedido (snapshot) */}
        <OrderSummaryConfirm order={lastOrder} />

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 max-w-md mx-auto">
          <Link
            to="/"
            className="w-full sm:w-auto bg-primary text-on-primary font-headline-md px-8 py-4 rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              home
            </span>
            Voltar ao Início
          </Link>
        </div>

        {/* Contato */}
        <div className="mt-8 pt-8 border-t border-surface-container-highest">
          <p className="font-body-md text-on-surface-variant mb-4">Dúvidas sobre o pedido?</p>
          <WhatsAppButton />
        </div>
      </div>
    </main>
  )
}

export default Confirmation
