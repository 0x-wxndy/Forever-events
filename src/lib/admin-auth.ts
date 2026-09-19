import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  adminSessionToken,
} from "@/lib/admin-constants";

export { ADMIN_COOKIE, adminPassword, adminSessionToken } from "@/lib/admin-constants";

export async function isAdminAuthed() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === adminSessionToken();
}

export async function setAdminSession() {
  const store = await cookies();
  store.set(ADMIN_COOKIE, adminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}
