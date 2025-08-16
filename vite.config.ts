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
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif,woff2,mp4}'],
      },
      includeAssets: ['favicon.ico', 'logo-light.webp', 'icon-192.webp', 'icon-512.webp'],
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
            src: '/icon-192.webp',
            sizes: '192x192',
            type: 'image/webp',
            purpose: 'any maskable',
          },
          {
            src: '/icon-512.webp',
            sizes: '512x512',
            type: 'image/webp',
            purpose: 'any maskable',
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
