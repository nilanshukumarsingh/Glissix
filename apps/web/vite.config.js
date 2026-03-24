import { resolve } from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      glissade: resolve(__dirname, '../../packages/glissade/src/index.ts'),
    },
  },
})
