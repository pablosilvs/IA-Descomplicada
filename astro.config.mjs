import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ia-descomplicadaoofc.netlify.app',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !page.includes('/buscar/') })],
  build: {
    format: 'directory',
  },
});
