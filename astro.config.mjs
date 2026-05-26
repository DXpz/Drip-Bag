// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [
    preact({ compat: true })
  ],
  output: 'static',
  vite: {
    plugins: [tailwind()]
  }
});