import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        governance: path.resolve(__dirname, "governance.html"),
        about: path.resolve(__dirname, "about.html"),
        insights: path.resolve(__dirname, "insights.html"),
        contact: path.resolve(__dirname, "contact.html"),
      },
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== "true",
  },
});
