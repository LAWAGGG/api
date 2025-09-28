import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/gallery': {
        target: 'https://lawaggg.github.io',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/gallery/, '/api/v1')
      }
    }
  },
  base:process.env.VITE_BASE_PATH,

})

// import { defineConfig } from 'vite' 
// import react from '@vitejs/plugin-react'  
// export default defineConfig({ plugins: [react()], server: { allowedHosts: ['*'] } })
