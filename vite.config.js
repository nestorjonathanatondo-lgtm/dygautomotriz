import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
  plugins: [react()],
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.NEXT_PUBLIC_SUPABASE_URL),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  },
  server: {
    port: 3000,
    open: true,
    allowedHosts: ['.vercel.run']
  },
  preview: {
    port: 3000
  },
  // For static deployment the index.html already contains everything
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
  }
})
