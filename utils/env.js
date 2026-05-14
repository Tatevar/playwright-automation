import path from "path";

export const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ?? "https://dev-dubaicorp-front.scribex.io";

export const authFile = path.resolve(
  process.env.PLAYWRIGHT_AUTH_FILE ?? "playwright/.auth/user.json",
);

export function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getAdminCredentials() {
  return {
    username: getRequiredEnv("ADMIN_EMAIL"),
    password: getRequiredEnv("ADMIN_PASSWORD"),
  };
}
