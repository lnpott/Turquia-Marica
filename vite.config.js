import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      checks: {
        // A advertência mede participação relativa dos hooks em builds locais
        // acima de 3 s; não representa regressão do bundle ou do runtime.
        pluginTimings: false,
      },
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        cardapio: resolve(import.meta.dirname, 'cardapio/index.html'),
        localizacao: resolve(import.meta.dirname, 'localizacao/index.html'),
      },
    },
  },
})
