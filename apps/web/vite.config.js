import { resolve } from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      glissix: resolve(__dirname, '../../packages/glissade/src/index.ts'),
    },
  },
})
