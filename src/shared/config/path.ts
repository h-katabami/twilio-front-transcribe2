export function normalizePathSegment(value: string | undefined): string {
  return String(value ?? "").replace(/^\/+|\/+$/g, "");
}

export function trimTrailingSlashes(value: string | undefined): string {
  return String(value ?? "").replace(/\/+$/g, "");
}

export function createBasePath(pathText: string): string {
  return pathText ? `/${pathText}` : "";
}