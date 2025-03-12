import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': "/src", // para hacer un comando y poder linkear desde src y no pensar en ./ ../
    }
  }
})
