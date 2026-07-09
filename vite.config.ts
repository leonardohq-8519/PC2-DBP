import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^(/auth|/courses)': {
        target: 'https://cs2031-2026-1-pc2-studytrack-production.up.railway.app',
        changeOrigin: true,
      }
    }
  }
})
