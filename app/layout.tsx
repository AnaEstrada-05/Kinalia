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
  alternates: {
    canonical: "/es",
    languages: { "es-MX": "/es" },
  },
  openGraph: {
    title: "Kinalia — Consultoría de IA, automatización y datos",
    description:
      "Menos pérdidas. Más decisiones con datos reales. Agenda una llamada de 30 minutos, sin costo ni compromiso.",
    url: "https://kinalia.com.mx/es",
    siteName: "Kinalia",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kinalia",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://kinalia.com.mx/#organization",
      name: "Kinalia",
      url: "https://kinalia.com.mx",
      logo: "https://kinalia.com.mx/assets/kinalia-logo-color.svg",
      email: "contacto@kinalia.com.mx",
    },
    {
      "@type": "WebSite",
      "@id": "https://kinalia.com.mx/#website",
      name: "Kinalia",
      url: "https://kinalia.com.mx",
      inLanguage: "es-MX",
      publisher: { "@id": "https://kinalia.com.mx/#organization" },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}