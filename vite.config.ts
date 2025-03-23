import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "/",
  server: {
    allowedHosts: [
      'dyze-app.com', // Add this line
    ],
    host: true, // Expose to network
    port: 5173, // Default Vite port
  },
  build: {
    outDir: "dist", // Explicit output directory
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
