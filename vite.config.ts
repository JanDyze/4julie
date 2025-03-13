import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"


// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // Expose to network
    port: 5173, // Default Vite port (change if needed)
    allowedHosts: ["dyze-app.com"],
  },

  plugins: [
    react(),
    tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
