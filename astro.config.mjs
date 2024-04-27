import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    optimizeDeps: {
      include: ['./script/script.js']
    },
    plugins: [
      // Agrega cualquier complemento necesario aquí
    ]
  },
  integrations: [tailwind()]
});