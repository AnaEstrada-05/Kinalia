import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ComingSoon from "@/components/ropemaster/ComingSoon";
import BeforeAfter from "@/components/ropemaster/BeforeAfter";
import Closing from "@/components/ropemaster/Closing";
import { copy } from "@/components/ropemaster/copy";
import Crossplay from "@/components/ropemaster/Crossplay";
import Faq from "@/components/ropemaster/Faq";
import Grain from "@/components/ropemaster/Grain";
import Flow from "@/components/ropemaster/Flow";
import { karla, poppins } from "@/components/ropemaster/fonts";
import Hero from "@/components/ropemaster/Hero";
import Licenses from "@/components/ropemaster/Licenses";
import Modes from "@/components/ropemaster/Modes";
import More from "@/components/ropemaster/More";
import Roles from "@/components/ropemaster/Roles";
import RopeMasterNav from "@/components/ropemaster/RopeMasterNav";
import Testimonials from "@/components/ropemaster/Testimonials";

// Landing de Rope Master. Antes era un Route Handler que servia HTML estatico;
// ahora es una pagina normal del App Router. Esta fuera del route group
// (site), asi que no hereda el Navbar de Kinalia: lleva su propio encabezado.
// Todo el texto (es/en) esta en components/ropemaster/copy.ts.
const LOCALES = ["es", "en"] as const;

// Mientras sea true, en produccion /productos/ropemaster muestra la pagina
// "Proximamente" (components/ropemaster/ComingSoon.tsx) en lugar de la landing
// completa, que ya esta lista. Para publicarla: cambia COMING_SOON a false.
// En desarrollo (next dev) siempre se ve la landing completa para poder
// trabajar en ella.
const COMING_SOON = true;
const showComingSoon = COMING_SOON && process.env.NODE_ENV === "production";
type Loc = (typeof LOCALES)[number];

const isLocale = (v: string): v is Loc =>
  (LOCALES as readonly string[]).includes(v);

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { title, description } = showComingSoon
    ? {
        title: copy[locale].comingSoon.metaTitle,
        description: copy[locale].comingSoon.metaDescription,
      }
    : copy[locale].meta;
  const url = `https://kinalia.com.mx/${locale}/productos/ropemaster`;

  return {
    title,
    description,
    icons: { icon: [{ url: "/rope-master/favicon.png", type: "image/png" }] },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Rope Master",
      locale: locale === "en" ? "en_US" : "es_MX",
      type: "website",
      images: [{ url: "/rope-master/hero.jpg", width: 1259, height: 842 }],
    },
  };
}

export default async function RopeMasterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = copy[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Rope Master",
    url: `https://kinalia.com.mx/${locale}/productos/ropemaster`,
    applicationCategory: "BusinessApplication",
    inLanguage: locale === "en" ? "en" : "es-MX",
    publisher: { "@id": "https://kinalia.com.mx/#organization" },
  };

  return (
    <div
      className={`${poppins.variable} ${karla.variable} min-h-screen bg-rm-sand font-rm-body text-[17px] leading-[1.55] text-rm-ink`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {showComingSoon ? (
        <ComingSoon c={c.comingSoon} />
      ) : (
        <>
          <Grain />
          <RopeMasterNav c={c.nav} locale={locale} />
          <main>
            <Hero c={c.hero} />
            <BeforeAfter c={c.contrast} />
            <Flow c={c.flow} />
            <Roles c={c.roles} />
            <Modes c={c.modes} />
            <Crossplay c={c.crossplay} />
            <More c={c.more} />
            <Licenses c={c.licenses} locale={locale} />
            <Testimonials c={c.testimonials} />
            <Faq c={c.faq} />
          </main>
          <Closing c={c.closing} footer={c.footer} locale={locale} />
        </>
      )}
    </div>
  );
}
