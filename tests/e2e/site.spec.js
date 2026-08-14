import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = [
  { path: '/', title: /Turquia Lanches \| Lanches/, canonical: 'https://turquia-marica.vercel.app/' },
  { path: '/cardapio/', title: /Cardápio em construção/, canonical: 'https://turquia-marica.vercel.app/cardapio/' },
  { path: '/localizacao/', title: /Localização \| Turquia Lanches/, canonical: 'https://turquia-marica.vercel.app/localizacao/' },
]

for (const route of routes) {
  test(`${route.path} carrega diretamente com metadados e acessibilidade`, async ({ page }) => {
    const consoleErrors = []
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text())
    })
    const response = await page.goto(route.path, { waitUntil: 'networkidle' })
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(route.title)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', route.canonical)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S+/)
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('a[href="#"]')).toHaveCount(0)
    await expect(page.locator('a[href="https://www.ifood.com.br/"]')).toHaveCount(0)

    const results = await new AxeBuilder({ page }).analyze()
    const blocking = results.violations.filter((violation) => ['critical', 'serious'].includes(violation.impact))
    expect(blocking).toEqual([])
    expect(consoleErrors).toEqual([])
  })
}

test('menu mobile abre, fecha com Escape e devolve o foco', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Abrir menu' })
  await toggle.click()
  await expect(page.getByRole('navigation', { name: 'Menu mobile' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation', { name: 'Menu mobile' })).toBeHidden()
  await expect(toggle).toBeFocused()
})

test('arquivos de descoberta são publicados e referenciam somente rotas válidas', async ({ request }) => {
  const robots = await request.get('/robots.txt')
  expect(robots.status()).toBe(200)
  expect(await robots.text()).toContain('Sitemap: https://turquia-marica.vercel.app/sitemap.xml')

  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  const xml = await sitemap.text()
  for (const route of routes) expect(xml).toContain(`<loc>${route.canonical}</loc>`)
})

test('reduced motion desativa as animações principais', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.page-transition')).toHaveCSS('animation-name', 'none')
})

test('cardápio apresenta categorias previstas sem filtros ou pedidos falsos', async ({ page }) => {
  await page.goto('/cardapio/')
  await expect(page.getByRole('group', { name: 'Filtrar por categoria' })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Ver categorias previstas' })).toHaveAttribute('href', '#categorias')
  await expect(page.getByRole('list', { name: 'Categorias previstas' }).getByRole('listitem')).toHaveCount(5)

  await expect(page.locator('a[href*="ifood"]')).toHaveCount(0)
  await expect(page.getByText('Conteúdo ainda não publicado')).toHaveCount(5)
})

test('hashes legados das categorias mantêm acesso direto e foco', async ({ page }) => {
  for (const category of ['combos', 'lanches', 'porcoes', 'bebidas', 'sobremesas']) {
    await page.goto('about:blank')
    const response = await page.goto(`/cardapio/#categoria-${category}`, { waitUntil: 'networkidle' })
    expect(response?.status()).toBe(200)
    await expect(page.locator(`#categoria-${category}`)).toBeFocused()
    expect(new URL(page.url()).hash).toBe(`#categoria-${category}`)
    const reload = await page.reload({ waitUntil: 'networkidle' })
    expect(reload?.status()).toBe(200)
    await expect(page.locator(`#categoria-${category}`)).toBeFocused()
  }
})

test('localização oferece ficha externa sem exagerar a precisão dos dados', async ({ page }) => {
  await page.goto('/localizacao/')
  const mapLinks = page.locator('a[href="https://maps.app.goo.gl/QHAQCBvrACZZK5Ho9"]')
  await expect(mapLinks).toHaveCount(3)
  for (const link of await mapLinks.all()) {
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', /noopener/)
    await expect(link).toHaveAttribute('rel', /noreferrer/)
  }

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Turquia Lanches')
  await expect(page.getByRole('link', { name: /abrir a ficha turquia lanches/i })).toBeVisible()
  await expect(page.getByText('Ilustração · não é um mapa')).toBeVisible()
  await expect(page.getByText('Parque Nanci, Maricá/RJ')).toBeVisible()
  await expect(page.getByText('Ainda não confirmados')).toBeVisible()
  await expect(page.getByText('Telefone também pendente')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Abrir Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/turquialanches/')
  await expect(page.getByText(/destino (confirmado|verificado)|rota exata/i)).toHaveCount(0)
  await expect(page.getByText(/CEP|estacionamento|acessibilidade|retirada|entrega/i)).toHaveCount(0)
})

test('ação visual da localização não fica coberta pela navegação inferior', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/localizacao/')
  const actionBox = await page.getByText('Conferir ficha').locator('..').boundingBox()
  const navigationBox = await page.getByRole('navigation', { name: 'Navegação inferior' }).boundingBox()

  expect(actionBox).not.toBeNull()
  expect(navigationBox).not.toBeNull()
  expect(actionBox.y + actionBox.height).toBeLessThanOrEqual(navigationBox.y)
})

test('não há overflow horizontal nos viewports de aceite', async ({ page }) => {
  for (const width of [320, 390, 768, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of routes) {
      await page.goto(route.path)
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }))
      expect(dimensions.content, `${route.path} em ${width}px`).toBeLessThanOrEqual(dimensions.viewport)
    }
  }
})
