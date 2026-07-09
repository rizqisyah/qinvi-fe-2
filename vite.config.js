import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Dev proxy: browser calls same-origin `/api/...`, Vite forwards to the real
  // backend. Set VITE_API_PROXY_TARGET in `.env` to your API host.
  const target = env.VITE_API_PROXY_TARGET || 'https://api.qinvi.id'

  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
