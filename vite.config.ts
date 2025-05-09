import path from 'node:path';

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: 'src/pages',
      generatedRouteTree: 'src/app/routes/routeTree.gen.ts',
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: 'public',
  cacheDir: '.vite',
});
