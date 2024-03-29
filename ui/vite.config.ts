import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    checker({
      typescript: true,
    }),
  ],
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
    open: "/",
  },
});
