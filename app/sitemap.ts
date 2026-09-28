import type { MetadataRoute } from "next";

const BASE = "https://kinalia.com.mx";

// Solo /es es público por ahora. Si se agrega /en, añadir a cada entrada:
//   alternates: { languages: { "es-MX": `${BASE}/es/...`, en: `${BASE}/en/...` } }
const paths = [
  "/es",
  "/es/productos/ropemaster",
  "/es/productos/ropemaster/licencias",
  "/es/legal/kinalia/terminos-y-condiciones",
  "/es/legal/ropemaster/aviso-de-privacidad",
  "/es/legal/ropemaster/eula",
  "/es/legal/ropemaster/politica-de-reembolso",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    priority: p === "/es" ? 1 : p.startsWith("/es/legal") ? 0.3 : 0.8,
  }));
}
