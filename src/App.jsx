import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'

function PagePlaceholder() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-stack-loose px-margin-mobile py-margin-desktop text-center"
      style={{ minHeight: '60vh' }}
    >
      <h1 className="font-headline-lg text-headline-lg text-primary">Turquia Lanches</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">A página que você procurou não existe.</p>
      <Link to="/" className="inline-flex min-h-11 items-center rounded-lg bg-primary px-6 py-3 font-label-bold text-on-primary hover:bg-primary-hover">Voltar ao início</Link>
    </section>
  )
}

// A aplicação mantém somente as rotas institucionais e de descoberta do menu;
// pedidos são concluídos externamente no iFood.
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cardapio" element={<Navigate replace to="/#cardapio" />} />
            <Route path="/localizacao" element={<Navigate replace to="/#localizacao" />} />
            <Route path="*" element={<PagePlaceholder />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
