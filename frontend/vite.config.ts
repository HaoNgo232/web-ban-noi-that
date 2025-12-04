import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom", "react-router"],
          "ui-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-popover",
            "@radix-ui/react-accordion",
          ],
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
          "query-vendor": ["@tanstack/react-query"],
          "motion-vendor": ["framer-motion"],
          "utils-vendor": ["axios", "zustand", "sonner"],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Minify
    minify: "esbuild",
    // Source maps for production debugging (optional)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router",
      "@tanstack/react-query",
      "axios",
      "zustand",
    ],
  },
  preview: {
    port: 4173,
    host: true,
  },
});
