import { resolve } from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  base: '/web/',
  resolve: {
    alias: {
      glissix: resolve(__dirname, '../../packages/glissix/src/index.ts'),
    },
  },
  server: {
    proxy: {
      '/docs': {
        target: 'http://localhost:5174',
        changeOrigin: true,
      },
    },
  },
})
