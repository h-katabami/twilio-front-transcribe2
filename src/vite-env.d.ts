/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PATH_TEXT: string;
	readonly VITE_AUTH_REGION: string;
	readonly VITE_AUTH_USER_POOL_ID: string;
	readonly VITE_AUTH_USER_POOL_WEB_CLIENT_ID: string;
	readonly VITE_AUTH_COOKIE_STORAGE_DOMAIN: string;
	readonly VITE_API_BASE_URL: string;
	readonly VITE_PROXY_BASE_URL: string;
	readonly VITE_DEPLOY_S3_BUCKET?: string;
	readonly CLOUDFRONT_DISTRIBUTION_ID?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
