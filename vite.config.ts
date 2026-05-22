import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const pathText = String(env.VITE_PATH_TEXT ?? "").replace(/^\/+|\/+$/g, "");
  const basePath = pathText ? `/${pathText}` : "";

  return {
    base: `${basePath}/`,
    plugins: [react()],
  };
});
