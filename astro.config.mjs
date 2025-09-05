import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alexcerium.github.io/AlexDEV',
  base: process.env.NODE_ENV === 'production' ? '/AlexDEV' : '/',
  outDir: './dist',
  build: {
    assets: 'assets'
  },
  vite: {
    ssr: {
      noExternal: ['*']
    }
  }
});
