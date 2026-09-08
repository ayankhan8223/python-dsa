import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        module1: resolve(import.meta.dirname, 'index.html'),
        module2: resolve(import.meta.dirname, 'module2.html'),
        module3: resolve(import.meta.dirname, 'module3.html'),
        module4: resolve(import.meta.dirname, 'module4.html'),
        module5: resolve(import.meta.dirname, 'module5.html'),
        module6: resolve(import.meta.dirname, 'module6.html'),
        module7: resolve(import.meta.dirname, 'module7.html')
      }
    }
  }
})
