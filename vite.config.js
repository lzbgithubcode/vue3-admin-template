import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css:{
    preprocessorOptions:{
      scss:{
        additionalData: '@import "@/assets/scss/index.scss";',
      }
    }
  }
})
