import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/flakomarket/", // ← ДОЛЖНО совпадать с названием репо!
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
