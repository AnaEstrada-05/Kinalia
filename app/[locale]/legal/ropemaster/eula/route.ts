import { readFile } from "fs/promises";
import path from "path";

// Rope Master's EULA — a hidden, self-contained legal page (its own <html>,
// <head>, <style> — Tailwind via CDN, no build step). Like the Rope Master
// landing page it's served as a raw Route Handler so it bypasses the root
// layout and the [locale] layout's <Navbar/> entirely.
//
// "Hidden" = not linked from any nav or footer and marked `noindex, nofollow`
// in the HTML itself. It's reachable only by its direct URL, e.g.
//   /es/legal/ropemaster/eula   ·   /en/legal/ropemaster/eula
//
// The contract itself is Spanish-only (Mexican law), so both locales serve the
// same document; the locale segment only exists to keep the URL consistent
// with the rest of the site and to 404 on anything else.
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
    "ropemaster-eula.html"
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
