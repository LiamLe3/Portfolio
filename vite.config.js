import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

=======

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
>>>>>>> 1ce84a0d20490ed4fa13664509ec5ad8a007801d
})
