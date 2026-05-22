import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/Collection-Showcase/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        database: resolve(__dirname, 'database.html'),
      }
    }
  }
})