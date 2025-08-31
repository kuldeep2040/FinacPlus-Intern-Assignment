import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'


export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '')
  
  return {
  plugins: [
    react(),
    federation({
      name: 'main',
      remotes: {
        music: env.VITE_MUSIC_REMOTE_URL
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
  }
})