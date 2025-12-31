import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@engine": path.resolve(__dirname, "../engine"),
      "@contract": path.resolve(__dirname, "../contract"),
    },
  },
});
