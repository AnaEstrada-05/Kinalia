"use client";

import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";

export default function HappyClients() {
  const { t } = useLanguage();
  const items = t.clients.items;
  // Repeat the client list enough times to comfortably overflow even a wide
  // desktop viewport, then duplicate that whole run once more so the strip
  // can loop seamlessly at translateX(-50%) with no visible gap or "stuck to
  // the left" look on short logo lists.
  const repeated = Array.from({ length: 8 }, () => items).flat();
  const track = [...repeated, ...repeated];

  return (
    <section id="clientes" className="relative pt-24 pb-8 sm:pt-28 sm:pb-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-14">
        <ScrollReveal variant="up">
          <div className="mx-auto max-w-xl text-center mb-16">
            <p className="eyebrow">{t.clients.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
              {t.clients.title}
            </h2>
            <p className="mt-5 text-ink-soft">{t.clients.subtitle}</p>
          </div>
        </ScrollReveal>
      </div>

      {/* Full-bleed band — deliberately breaks out of the max-w-7xl column so
          the logo strip runs edge-to-edge like the rest of the page's nav/footer. */}
      <ScrollReveal variant="up" delay={80}>
        <div className="marquee-track relative w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y border-terracotta/15 bg-terracotta/5 py-10 sm:py-12">
          <div
            className="overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="animate-marquee flex w-max items-center gap-8 px-8">
              {track.map((client, index) => (
                <a
                  key={`${client.name}-${index}`}
                  href={client.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={client.name}
                  className="group relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-sm transition-colors duration-300 hover:border-terracotta/40 sm:h-32 sm:w-32 sm:p-6"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-full object-contain"
                  />
                  {/* Reveal caption lives inside the tile's own bounds (clipped
                      by its rounded corners), so it never overlaps neighbors
                      or gets cut off by the strip's outer overflow clip. */}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-1 rounded-b-2xl bg-terracotta py-2 text-[11px] font-medium text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {t.clients.viewSite}
                    <ArrowUpRight size={12} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
