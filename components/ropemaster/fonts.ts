import { Karla, Poppins } from "next/font/google";

// Tipografias de Rope Master. Se exponen como variables CSS (--rm-font-*) que
// el tema de globals.css usa para font-rm-display y font-rm-body. La fuente
// mono es la IBM Plex Mono que ya carga el layout raiz (font-mono).
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--rm-font-display",
  display: "swap",
});

export const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--rm-font-body",
  display: "swap",
});
