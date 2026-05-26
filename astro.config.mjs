// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [
    preact({ compat: true })
  ],
  output: 'static',
  vite: {
    plugins: [tailwind()]
  }
});