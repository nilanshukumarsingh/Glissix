import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Glissade',
  description: 'Inertia-driven motion for tactile interfaces.',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/glissade' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Motion Model', link: '/guide/motion-model' },
        ],
      },
      {
        text: 'Reference',
        items: [{ text: 'Glissade API', link: '/api/glissade' }],
      },
    ],
  },
})
