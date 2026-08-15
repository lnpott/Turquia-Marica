import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const evidenceName = (projectName) => `documentacao/qa/etapa-28/${projectName}.png`

test('rota demonstra dados fictícios com interação, isolamento e evidência', async ({ page }, testInfo) => {
  const consoleErrors = []
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })

  const response = await page.goto('/__visual-qa', { waitUntil: 'networkidle' })
  expect(response?.status()).toBe(200)
  await expect(page).toHaveTitle('DADOS FICTÍCIOS — QA VISUAL')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex, nofollow/)
  await expect(page.getByRole('status')).toContainText('nenhum item ou preço é real')
  await expect(page.locator('article')).toHaveCount(16)
  await expect(page.getByRole('banner')).toBeVisible()
  if (testInfo.project.use.viewport.width < 768) {
    await expect(page.getByRole('navigation', { name: 'Navegação inferior' })).toBeVisible()
  } else {
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible()
  }

  const filters = page.getByRole('group', { name: 'Filtrar por categoria' })
  await filters.getByRole('button', { name: 'Bebidas' }).click()
  await expect(filters.getByRole('button', { name: 'Bebidas' })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('article')).toHaveCount(4)
  await filters.getByRole('button', { name: 'Todos' }).click()
  await expect(page.locator('article')).toHaveCount(16)

  await page.getByRole('heading', { name: 'Lanche demonstrativo com um nome propositalmente muito longo' }).hover()
  const axe = await new AxeBuilder({ page }).analyze()
  expect(axe.violations.filter(({ impact }) => ['critical', 'serious'].includes(impact))).toEqual([])
  expect(consoleErrors).toEqual([])

  for (const card of await page.locator('article').all()) await card.scrollIntoViewIfNeeded()
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.waitForTimeout(1_200)
  await page.screenshot({ path: evidenceName(testInfo.project.name), fullPage: true })
})
