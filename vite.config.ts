// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // importante para producción
  build: {
    outDir: 'dist',
  },
  server: {
    open: true, // opcional, abre el navegador al iniciar
  },
});
