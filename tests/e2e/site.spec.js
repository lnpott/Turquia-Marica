import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = [
  { path: '/', title: /Turquia Lanches \| Lanches/ },
  { path: '/cardapio/', title: /Cardápio em construção/ },
  { path: '/localizacao/', title: /Localização \| Turquia Lanches/ },
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
