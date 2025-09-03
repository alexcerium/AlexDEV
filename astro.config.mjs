import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alexmatkava.com',
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
