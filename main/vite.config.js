import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'


export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'main',
      remotes: {
        music: 'https://finac-plus-intern-assignment.vercel.app/assets/remoteEntry.js'
      },
      shared: {
        'react': {
          singleton: true
        },
        'react-dom': {
          singleton: true
        }
      }
    })
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  }
})