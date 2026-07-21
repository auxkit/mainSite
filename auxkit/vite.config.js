import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo at /mainSite/ unless a custom domain is set;
  // CI passes VITE_BASE_PUBLIC_PATH, local dev falls back to '/'.
  base: process.env.VITE_BASE_PUBLIC_PATH || '/',
  plugins: [vue()],
})
