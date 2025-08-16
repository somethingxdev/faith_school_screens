import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: { enabled: true },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
      includeAssets: ['favicon.ico', 'images/logo-light.webp'],
      manifest: {
        short_name: 'Пример PWA',
        name: 'Глава 6 - Пример прогрессивного веб-приложения',
        start_url: '/',
        display: 'standalone',
        theme_color: '#333333',
        background_color: '#000000',
        orientation: 'portrait',
        icons: [
          {
            src: '/logo-light.webp',
            sizes: 'any',
            type: 'image/webp',
          },
        ],
        prefer_related_applications: false,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
