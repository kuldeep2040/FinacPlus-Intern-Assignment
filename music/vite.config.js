import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'


export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'music',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx',
        './MusicLibraryWrapper': './src/components/MusicLibraryWrapper.jsx',
        './MusicLibrary': './src/components/MusicLibrary.jsx',
        './AuthProvider': './src/context/AuthContext.jsx'
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
    port: 3001
  },
  preview: {
    port: 3001
  }
})