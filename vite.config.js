import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ВАЖНО: замени на название своего репозитория!
const repoName = 'flakomarket'

export default defineConfig({
  plugins: [vue()],
  base: `/${repoName}/`,
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})