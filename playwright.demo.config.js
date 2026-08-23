import { defineConfig, devices } from '@playwright/test'

const viewports = [
  { name: 'demo-320', viewport: { width: 320, height: 720 } },
  { name: 'demo-390', viewport: { width: 390, height: 844 } },
  { name: 'demo-768', viewport: { width: 768, height: 1024 } },
  { name: 'demo-1280', viewport: { width: 1280, height: 900 } },
  { name: 'demo-1440', viewport: { width: 1440, height: 1000 } },
]

export default defineConfig({
  testDir: './tests/e2e-demo',
  fullyParallel: false,
  reporter: 'list',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:4174',
    trace: 'on-first-retry',
  },
  projects: viewports.map(({ name, viewport }) => ({ name, use: { viewport } })),
  webServer: {
    command: 'npm run build:demo && npm run preview -- --host 127.0.0.1 --port 4174',
    url: 'http://127.0.0.1:4174/visual-qa-demo',
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
