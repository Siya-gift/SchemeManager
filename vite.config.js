import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    watch: {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/vendor/**',     // Ignore PHP composer vendor folders
        '**/venv/**',       // Ignore Python virtual environments
        '**/storage/**',    // Ignore large backend storage/cache folders
      ]
    }
  }
})

