import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './frontend',
  server: {
    port: 5173,
    proxy: {
      '/create-paywall': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/verify-payment': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
});
