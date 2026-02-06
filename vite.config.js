import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

// Plugin para manejar llamadas API en desarrollo
const devApiPlugin = () => ({
  name: 'dev-api-handler',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.startsWith('/api/')) {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
        res.end(JSON.stringify({
          success: false,
          message: 'Las funciones API solo están disponibles en producción (Vercel). Para probar las funciones de contacto y aplicación, despliega a Vercel.',
          dev: true,
          endpoint: req.url
        }))
        return
      }
      next()
    })
  }
})

export default defineConfig({
  plugins: [
    vue(),
    devApiPlugin(), // Manejar API calls en desarrollo

    // Compresión gzip
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // Solo comprimir archivos > 10KB
      deleteOriginFile: false
    }),

    // Compresión brotli (mejor que gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false
    }),

    // Bundle analyzer (genera reporte en stats.html)
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],

  base: '/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Optimizaciones de build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,

    // Minificación mejorada
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true
      }
    },

    // Chunks optimizados
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'components': [
            './src/components/sections/HeroSection.vue',
            './src/components/sections/VideoBackground.vue'
          ]
        },

        // Nombres de archivos con hash para cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },

    // Optimizar chunks
    chunkSizeWarningLimit: 600
  }
})