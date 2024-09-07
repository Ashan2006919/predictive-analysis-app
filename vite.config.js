import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/predictive-analysis-app/',
    build: {
    chunkSizeWarningLimit: 1000
  },
  plugins: [react()],
  resolve: {
    alias: {
      // Add any aliases you need here
    },
  },
  optimizeDeps: {
    include: [
      'three', 
      '@react-three/fiber', 
      '@react-three/drei', 
      '@use-gesture/react',
      'framer-motion'
    ],
  },
  server: {
    proxy: {
      '/analyze': {
        target: 'http://127.0.0.1:5000', // Flask backend URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/analyze/, ''),
      },
    },
  },
});
