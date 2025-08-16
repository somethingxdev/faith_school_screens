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
      includeAssets: [
        'favicon.ico',
        'logo-light.webp',
        'icon-192.webp',
        'icon-512.webp',
        'icons/icon-48x48.webp',
        'icons/icon-72x72.webp',
        'icons/icon-96x96.webp',
        'icons/icon-128x128.webp',
        'icons/icon-144x144.webp',
        'icons/icon-152x152.webp',
        'icons/icon-192x192.webp',
        'icons/icon-256x256.webp',
        'icons/icon-384x384.webp',
        'icons/icon-512x512.webp',
        'screenshots/wide-1440x900.webp',
        'screenshots/mobile-1080x2400.webp',
      ],
      manifest: {
        id: '/',
        start_url: '/',
        display: 'standalone',
        theme_color: '#333333',
        background_color: '#000000',
        orientation: 'portrait',
        name: 'Faith School',
        short_name: 'Faith School',
        icons: [
          {
            src: '/icons/icon-48x48.webp',
            sizes: '48x48',
            type: 'image/webp',
          },
          {
            src: '/icons/icon-72x72.webp',
            sizes: '72x72',
            type: 'image/webp',
          },
          {
            src: '/icons/icon-96x96.webp',
            sizes: '96x96',
            type: 'image/webp',
          },
          {
            src: '/icons/icon-128x128.webp',
            sizes: '128x128',
            type: 'image/webp',
          },
          {
            src: '/icons/icon-144x144.webp',
            sizes: '144x144',
            type: 'image/webp',
          },
          {
            src: '/icons/icon-152x152.webp',
            sizes: '152x152',
            type: 'image/webp',
          },
          {
            src: '/icons/icon-192x192.webp',
            sizes: '192x192',
            type: 'image/webp',
          },
          {
            src: '/icons/icon-256x256.webp',
            sizes: '256x256',
            type: 'image/webp',
          },
          {
            src: '/icons/icon-384x384.webp',
            sizes: '384x384',
            type: 'image/webp',
          },
          {
            src: '/icons/icon-512x512.webp',
            sizes: '512x512',
            type: 'image/webp',
          },
        ],
        screenshots: [
          {
            src: '/screenshots/wide.png',
            sizes: '1440x900',
            type: 'image/png',
            form_factor: 'wide',
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
