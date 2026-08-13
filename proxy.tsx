import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["es", "en"] as const;
const DEFAULT = "es";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar assets, api, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  // Si ya tiene /es o /en, no tocar
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (hasLocale) return;

  // Siempre redirigir a español por defecto
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};