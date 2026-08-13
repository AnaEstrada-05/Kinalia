import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Kinalia — Consultoría de IA, automatización y datos",
  description:
    "Kinalia transforma tus datos y procesos en soluciones de IA a la medida — paso a paso, sin comprometerte de más.",
  metadataBase: new URL("https://kinalia.com.mx"),
  icons: {
    icon: [
      { url: "/assets/kinalia-logo-color.svg", type: "image/svg+xml" },
    ],
    apple: "/assets/kinalia-logo-color.svg",
  },
  openGraph: {
    title: "Kinalia — Consultoría de IA, automatización y datos",
    description:
      "Menos pérdidas. Más decisiones con datos reales. Agenda una llamada de 30 minutos, sin costo ni compromiso.",
    url: "https://kinalia.com.mx",
    siteName: "Kinalia",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/assets/kinalia-logo-color.svg",
        width: 512,
        height: 512,
        alt: "Kinalia",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}