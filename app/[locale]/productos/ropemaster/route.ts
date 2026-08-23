import { readFile } from "fs/promises";
import path from "path";

// Rope Master is a fully self-contained static landing page (its own <html>,
// <head>, <style>, and <script> — Tailwind via CDN, no build step). It's served
// here as a raw Route Handler instead of a normal page.tsx so it bypasses the
// root layout and the [locale] layout's <Navbar/> entirely — no double header,
// no nested <html>, no hydration mismatches from mixing a static page into the
// React tree.
const LOCALES = ["es", "en"] as const;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.join(process.cwd(), "content", "ropemaster.html");
  let html = await readFile(filePath, "utf-8");

  // The page ships in Spanish by default (its own [data-i18n] toggle already
  // supports EN/ES client-side). For /en visitors we flip the initial state
  // server-side — the page's own script then runs applyLang(currentLang) once
  // on load, which swaps every [data-i18n] node and both the label + <html lang>.
  if (locale === "en") {
    html = html
      .replace('<html lang="es">', '<html lang="en">')
      .replace(
        "<title>Rope Master · Sistema profesional de gestión de eventos de lazo</title>",
        "<title>Rope Master · Professional Roping Event Management System</title>"
      )
      .replace(
        '<meta name="description" content="Rope Master: el sistema de arena distribuido con tecnología Crossplay offline para gestionar tu serial de lazo con precisión profesional, incluso sin internet.">',
        '<meta name="description" content="Rope Master: run your roping series with professional precision — series, events, teams and results synced in real time, even without a single bar of signal.">'
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
