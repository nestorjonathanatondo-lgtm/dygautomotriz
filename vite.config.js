import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    allowedHosts: ['sb-55o5oyyaadzh.vercel.run']
  },
  preview: {
    port: 3000
  },
  // For static deployment the index.html already contains everything
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
