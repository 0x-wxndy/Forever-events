import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminSessionToken } from "@/lib/admin-constants";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

function isAdminSection(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/") || /\/[a-z]{2}\/admin(\/|$)/.test(pathname);
}

function isAdminLogin(pathname: string) {
  return pathname === "/admin/login" || pathname.endsWith("/admin/login");
}

function loginUrl(request: NextRequest) {
  const prefix = request.nextUrl.pathname.startsWith("/en") ? "/en" : "";
  return new URL(`${prefix}/admin/login`, request.url);
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAdminSection(pathname) && !isAdminLogin(pathname)) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    if (token !== adminSessionToken()) {
      return NextResponse.redirect(loginUrl(request));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
