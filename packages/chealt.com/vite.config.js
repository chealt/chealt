import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: '#app',
        additionalPrerenderRoutes: ['/404'],
        previewMiddlewareEnabled: true,
        previewMiddlewareFallback: '/404'
      }
    }),
    // eslint-disable-next-line new-cap
    VitePWA({
      manifest: {
        name: 'Chealt',
        short_name: 'Chealt', // eslint-disable-line camelcase
        background_color: 'rgb(26 26 26)', // eslint-disable-line camelcase
        theme_color: 'rgb(236 179 66)' // eslint-disable-line camelcase
      },
      devOptions: {
        enabled: true
      },
      suppressWarnings: true
    })
  ]
});
