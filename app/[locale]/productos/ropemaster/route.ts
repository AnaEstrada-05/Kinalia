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
  const html = await readFile(filePath, "utf-8");

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
