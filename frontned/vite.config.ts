import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
// import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      target: "react",
      enableRouteGeneration: false,
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    react(),
    // svgr({
    //   include: "**/*.svg",
    //   svgrOptions: {
    //     exportType: "default",
    //     ref: true,
    //     svgo: false,
    //     titleProp: true,
    //   },
    // }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/products/photos/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src", "app"),
      "@features": path.resolve(__dirname, "src", "features"),
      "@widgets": path.resolve(__dirname, "src", "widgets"),
      "@pages": path.resolve(__dirname, "src", "pages"),
      "@entities": path.resolve(__dirname, "src", "entities"),
      "@shared": path.resolve(__dirname, "src", "shared"),
    },
  },
});
