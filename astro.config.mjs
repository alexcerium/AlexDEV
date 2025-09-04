import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alexmatkava.github.io',
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
