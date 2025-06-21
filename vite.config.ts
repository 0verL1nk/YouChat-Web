import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5050',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/wsApi': {
          target: 'ws://127.0.0.1:5050',
          ws: true, // ✅ 告诉 Vite 这是 WebSocket
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/wsApi/, ''), // 可选
        },
      },
    },
  }
})
