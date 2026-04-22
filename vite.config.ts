import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  // Обязательно добавьте эту строку ниже:
  base: '/magazovdinar/', 
  
  // Я убрал viteSingleFile(), так как для GitHub Pages он не нужен и может мешать
  plugins: [react(), tailwindcss()], 
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
