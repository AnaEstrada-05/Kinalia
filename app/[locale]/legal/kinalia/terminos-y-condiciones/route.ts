import { readFile } from "fs/promises";
import path from "path";

// Kinalia's site-wide Términos y Condiciones — a hidden, self-contained legal
// page (its own <html>, <head>, <style> — Tailwind via CDN, no build step). Like
// the Rope Master legal pages it's served as a raw Route Handler so it bypasses
// the root layout and the [locale] layout's <Navbar/> entirely.
//
// "Hidden" = not linked from any nav and marked `noindex, nofollow` in the HTML
// itself. It's reachable by its direct URL and from the Rope Master footer:
//   /es/legal/kinalia/terminos-y-condiciones
//   /en/legal/kinalia/terminos-y-condiciones
//
// These Terms govern use of the site, contracting services, and buying software
// licences (the per-product detail lives in each product's EULA, Aviso de
// Privacidad and Política de Reembolso). Spanish-only (Mexican law), so both
// locales serve the same document; the locale segment only keeps the URL
// consistent and 404s anything else.
const LOCALES = ["es", "en"] as const;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    "content",
    "legal",
    "kinalia-terminos-y-condiciones.html"
  );
  const html = await readFile(filePath, "utf-8");

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
