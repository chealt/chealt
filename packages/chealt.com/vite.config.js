import preact from '@preact/preset-vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    preact(),
    // eslint-disable-next-line new-cap
    VitePWA({
      injectRegister: 'auto',
      manifest: {
        name: 'Chealt',
        short_name: 'Chealt', // eslint-disable-line camelcase
        background_color: 'rgb(26 26 26)', // eslint-disable-line camelcase
        theme_color: 'rgb(236 179 66)' // eslint-disable-line camelcase
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  esbuild: {
    loader: 'jsx'
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  }
});
