import { normalizePathSegment, trimTrailingSlashes } from "./path.ts";

function required(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing env: ${key}`);
  }
  return value;
}

export const env = {
  pathText: normalizePathSegment(import.meta.env.VITE_PATH_TEXT),
  authRegion: required("VITE_AUTH_REGION"),
  authUserPoolId: required("VITE_AUTH_USER_POOL_ID"),
  authUserPoolWebClientId: required("VITE_AUTH_USER_POOL_WEB_CLIENT_ID"),
  authCookieStorageDomain: required("VITE_AUTH_COOKIE_STORAGE_DOMAIN"),
  apiBaseUrl: trimTrailingSlashes(required("VITE_API_BASE_URL")),
  proxyBaseUrl: trimTrailingSlashes(required("VITE_PROXY_BASE_URL")),
};
