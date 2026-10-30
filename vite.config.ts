import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // Use terser for better minification (strips console.logs, dead code)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
        passes: 2,
      },
    },

    // Raise the warning threshold — we have vendor chunks intentionally
    chunkSizeWarningLimit: 600,

    // CSS code splitting is on by default in Vite — keep it
    cssCodeSplit: true,

    rollupOptions: {
      output: {
        // Manual chunk splitting for optimal long-term caching
        manualChunks(id) {
          // Core React runtime → tiny, changes rarely
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core'
          }
          // Framer Motion → large, changes rarely, cache independently
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion'
          }
          // React Router → medium, rarely changes
          if (id.includes('node_modules/react-router')) {
            return 'react-router'
          }
          // Lucide icons → currently 132 KB, isolate it
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide'
          }
          // Lenis smooth scroll
          if (id.includes('node_modules/lenis')) {
            return 'lenis'
          }
        },
        // Hash-based file names for cache busting
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },

  // Optimize deps pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
})
