import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/docs/',
  title: 'Glissix',
  description: 'Inertia-driven motion for tactile interfaces.',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]],
  ignoreDeadLinks: true,
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/glissix' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Motion Model', link: '/guide/motion-model' },
          { text: 'Author', link: '/guide/author' },
        ],
      },
      {
        text: 'Reference',
        items: [{ text: 'Glissix API', link: '/api/glissix' }],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nilanshukumarsingh' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/nilanshukumarsingh/' },
      { icon: 'twitter', link: 'https://x.com/nilanshukumar81' },
    ],
    footer: {
      message: 'Glissix is built as a tactile UI motion engine for modern interfaces.',
      copyright: 'Built by Nilanshu Kumar Singh',
    },
  },
})
