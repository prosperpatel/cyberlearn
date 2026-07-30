import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    target: 'ES2020',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          const pkg = id.split('node_modules/')[1].split('/')[0]
          if (pkg === 'react' || pkg === 'react-dom' || pkg === 'scheduler') return 'react'
          if (pkg === 'react-router' || pkg === 'react-router-dom' || pkg === '@remix-run') return 'router'
          if (pkg === '@supabase') return 'supabase'
          if (pkg === 'framer-motion' || pkg === 'motion') return 'motion'
          if (pkg === '@radix-ui' || pkg === 'lucide-react' ||
              pkg === 'class-variance-authority' || pkg === 'clsx' || pkg === 'tailwind-merge') return 'ui'
          if (pkg === 'howler') return 'audio'
          return 'vendor'
        },
      },
    },
  },
})
