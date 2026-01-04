import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // ✅ REQUIRED FOR GITHUB PAGES
  base: "/Resume-Builder/",

  // ✅ ONLY FOR LOCAL DEV (npm run dev)
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
