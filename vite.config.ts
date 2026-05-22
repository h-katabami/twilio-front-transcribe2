import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { createBasePath, normalizePathSegment } from "./src/shared/config/path.ts";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const pathText = normalizePathSegment(env.VITE_PATH_TEXT);

  return {
    base: `${createBasePath(pathText)}/`,
    plugins: [react()],
  };
});
