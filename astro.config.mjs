import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alexmatkava.com',
  integrations: [],
  vite: {
    ssr: {
      noExternal: ['*']
    }
  }
});
