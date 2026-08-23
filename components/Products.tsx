"use client";

import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";

export default function Products() {
  const { t, locale } = useLanguage();
  const items = t.products.items;

  return (
    <section id="productos" className="relative px-6 py-24 sm:px-8 md:px-14">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal variant="up">
          <div className="mx-auto max-w-xl text-center mb-16">
            <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
              {t.products.title}
            </h2>
            <p className="mt-5 text-ink-soft">{t.products.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col gap-6">
          {items.map((product, index) => (
            <ScrollReveal key={product.id} variant="up" delay={index * 80}>
              <a
                href={`/${locale}${product.href}`}
                className="card-hover-lift group flex flex-col items-center gap-8 rounded-2xl border border-line bg-card p-8 sm:flex-row sm:gap-10 sm:rounded-[32px] sm:p-10"
              >
                {/* Badge: anillo degradado azul→teal detrás del logo — el
                    acento de marca vive aquí, no en el fondo de toda la tarjeta */}
                <span className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-[26px] bg-gradient-to-br from-terracotta to-teal p-[3px] sm:h-32 sm:w-32">
                  <span className="flex h-full w-full items-center justify-center rounded-[23px] bg-white p-4">
                    <img
                      src={product.logo}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </span>
                </span>

                <div className="flex flex-1 flex-col items-center text-center sm:items-start sm:text-left">
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-terracotta">
                    {product.tag}
                  </span>
                  <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
                    {product.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-cream transition-transform duration-150 group-hover:scale-[1.03]">
                    {t.products.viewProduct}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
