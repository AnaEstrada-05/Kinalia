import { readFile } from "fs/promises";
import path from "path";

// Rope Master's Política de Reembolso — a hidden, self-contained legal page
// (its own <html>, <head>, <style> — Tailwind via CDN, no build step). Like the
// EULA and Aviso de Privacidad pages and the Rope Master landing page it's served
// as a raw Route Handler so it bypasses the root layout and the [locale] layout's
// <Navbar/> entirely.
//
// "Hidden" = not linked from any nav or footer and marked `noindex, nofollow`
// in the HTML itself. It's reachable only by its direct URL, e.g.
//   /es/legal/ropemaster/politica-de-reembolso
//   /en/legal/ropemaster/politica-de-reembolso
//
// It forms part of the EULA (clause 6) and Stripe / LFPC both require it to be
// visible and linked from the purchase page before charging. The policy is
// Spanish-only (Mexican law, LFPC), so both locales serve the same document;
// the locale segment only keeps the URL consistent and 404s anything else.
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
    "ropemaster-politica-de-reembolso.html"
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
