import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base URL pour GitHub Pages - Remplacez 'SongeYume' par le nom de votre dépôt
  base: '/SongeYume/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Optimisation pour la production
    minify: 'esbuild',
    sourcemap: false
  }
})

