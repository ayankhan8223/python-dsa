import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        module1: resolve(import.meta.dirname, 'index.html'),
        module2: resolve(import.meta.dirname, 'module2.html'),
        module3: resolve(import.meta.dirname, 'module3.html'),
        module4: resolve(import.meta.dirname, 'module4.html')
      }
    }
  }
})
