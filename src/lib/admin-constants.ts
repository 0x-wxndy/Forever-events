export const ADMIN_COOKIE = "forever_admin";

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "forever-admin";
}

export function adminSessionToken() {
  return process.env.ADMIN_SESSION_TOKEN || "forever-session";
}
