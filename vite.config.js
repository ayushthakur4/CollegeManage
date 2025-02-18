import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows external access
    allowedHosts: [
      '5636-2409-40d7-103e-cc5b-27b8-dcb5-c484-c91d.ngrok-free.app'
    ]
  }
})
