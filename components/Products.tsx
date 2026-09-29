"use client";

import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";

export default function Products() {
  const { t, locale } = useLanguage();
  const items = t.products.items;

  return (
    <section
      id="productos"
      className="relative overflow-hidden px-6 py-24 sm:px-8 md:px-14"
    >
      {/* Ambient blobs — same visual language as Hero/Process, so the page
          reads as one continuous atmosphere instead of separate sections. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/30 via-transparent to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -left-36 bottom-[8%] h-[360px] w-[360px] rounded-full border-[2px] border-[#0057FF]/20 sm:h-[440px] sm:w-[440px]" />
        <div className="absolute -left-20 bottom-[12%] h-[260px] w-[260px] rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -right-32 top-[4%] h-[340px] w-[340px] rounded-full border-[2px] border-[#189b93]/20 sm:h-[420px] sm:w-[420px]" />
        <div className="absolute -right-16 top-[8%] h-[260px] w-[260px] rounded-full bg-teal-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal variant="up">
          <div className="mx-auto max-w-xl text-center mb-20">
            <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
              {t.products.title}
            </h2>
            <p className="mt-5 text-ink-soft">{t.products.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:items-stretch sm:gap-10">
          {items.map((product, index) => {
            const isComingSoon = Boolean(product.comingSoon);

            const card = (
              <div className="product-tilt group relative h-[360px] w-[260px] overflow-hidden rounded-[28px] shadow-[0_20px_50px_rgba(10,42,107,0.16)] ring-1 ring-ink/5 sm:h-[420px] sm:w-[300px]">
                {product.cardBg ? (
                  <div className={`flex h-full w-full items-center justify-center p-12 ${product.cardBg}`}>
                    <img
                      src={product.logo}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-ink/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {isComingSoon ? (
                    <span className="rounded-full border border-cream/40 px-5 py-2.5 text-sm font-medium tracking-wide text-cream">
                      {t.products.comingSoon}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2.5 rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-cream transition-transform duration-150 group-hover:scale-[1.03]">
                      {t.products.viewProduct}
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </span>
                  )}
                </div>
              </div>
            );

            return (
              <ScrollReveal key={product.id} variant="up" delay={index * 100}>
                {isComingSoon ? (
                  <div
                    aria-label={`${product.name} — ${t.products.comingSoon}`}
                    className="block cursor-default"
                  >
                    {card}
                  </div>
                ) : (
                  <a href={`/${locale}${product.href}`} aria-label={product.name} className="block">
                    {card}
                  </a>
                )}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
