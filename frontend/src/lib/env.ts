/**
 * Runtime Environment Configuration
 *
 * Hỗ trợ 2 chế độ:
 * 1. Development: Đọc từ import.meta.env (Vite)
 * 2. Production (Docker): Đọc từ globalThis.__ENV__ (injected at runtime)
 */

// Type definition cho runtime environment
interface RuntimeEnv {
  VITE_API_URL?: string;
  VITE_APP_NAME?: string;
}

// Extend globalThis để TypeScript nhận diện __ENV__
declare global {
  // eslint-disable-next-line no-var
  var __ENV__: RuntimeEnv | undefined;
}

/**
 * Lấy giá trị biến môi trường với fallback
 * Ưu tiên: globalThis.__ENV__ > import.meta.env > defaultValue
 */
function getEnvVar(key: keyof RuntimeEnv, defaultValue: string): string {
  // Runtime environment (Docker)
  const runtimeEnv = globalThis.__ENV__;
  if (runtimeEnv?.[key]) {
    return runtimeEnv[key];
  }

  // Build-time environment (Vite dev/build)
  const viteValue = import.meta.env[key];
  if (viteValue) {
    return viteValue;
  }

  return defaultValue;
}

// Export các biến môi trường
export const env = {
  API_URL: getEnvVar("VITE_API_URL", "http://localhost:3000"),
  APP_NAME: getEnvVar("VITE_APP_NAME", "Noi That Viet"),
} as const;

// Debug log (chỉ chạy 1 lần khi module được load)
if (import.meta.env.DEV) {
  console.log("🔧 Environment Config:", env);
}
