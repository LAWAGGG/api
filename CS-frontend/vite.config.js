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
  }

})

// import { defineConfig } from 'vite' 
// import react from '@vitejs/plugin-react'  
// export default defineConfig({ plugins: [react()], server: { allowedHosts: ['*'] } })
