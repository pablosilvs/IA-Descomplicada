import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://descomplica-iaofc.netlify.app',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !page.includes('/buscar/') })],
  build: {
    format: 'directory',
  },
});
