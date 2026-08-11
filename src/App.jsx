import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Location from './pages/Location'

// Placeholder para rotas desconhecidas.
function PagePlaceholder() {
  return (
    <section
      className="flex flex-col items-center justify-center gap-stack-loose px-margin-mobile py-margin-desktop text-center"
      style={{ minHeight: '60vh' }}
    >
      <h1 className="font-headline-lg text-headline-lg text-primary">Turquia Lanches</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
        Esta página será implementada nos próximos lotes.
      </p>
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
            <Route path="/cardapio" element={<Menu />} />
            <Route path="/localizacao" element={<Location />} />
            <Route path="*" element={<PagePlaceholder />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
