import { readFile } from "fs/promises";
import path from "path";

// Rope Master's license manual — a self-contained static page (its own <html>,
// <head>, <style>, and <script> — Tailwind via CDN, no build step). Like the
// Rope Master landing page it's served as a raw Route Handler so it bypasses the
// root layout and the [locale] layout's <Navbar/> entirely — no double header,
// no nested <html>, no hydration mismatches.
//
// Reachable from the landing page ("Saber más sobre las licencias" under the
// pricing table, and "Manual de Usuario" in the footer) at:
//   /es/productos/ropemaster/licencias   ·   /en/productos/ropemaster/licencias
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
    "ropemaster-licencias.html"
  );
  let html = await readFile(filePath, "utf-8");

  // The page ships in Spanish; its own [data-i18n] toggle already supports
  // EN/ES client-side. For /en visitors we flip the initial state server-side —
  // applyLang(currentLang) then runs once on load and swaps every [data-i18n]
  // node plus the <html lang> and the toggle label.
  if (locale === "en") {
    html = html
      .replace('<html lang="es">', '<html lang="en">')
      .replace(
        "<title>Rope Master · Manual de licencias</title>",
        "<title>Rope Master · Licensing manual</title>"
      )
      .replace("let currentLang = 'es';", "let currentLang = 'en';");
  }

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
