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

        <div
          className={`grid gap-6 ${
            items.length === 1
              ? "mx-auto max-w-xl grid-cols-1"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {items.map((product, index) => (
            <ScrollReveal key={product.id} variant="up" delay={index * 80}>
              <a
                href={`/${locale}${product.href}`}
                className="card-hover-lift group flex h-full flex-col gap-5 rounded-[22px] border border-line bg-card p-6 sm:p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-line bg-white p-2">
                    <img
                      src={product.logo}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink">
                      {product.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-ink-soft">
                      {product.tag}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-ink-soft">
                  {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="text-xs font-medium text-ink-faint transition-colors duration-200 group-hover:text-terracotta">
                    {t.products.viewProduct}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-faint transition-all duration-200 group-hover:border-terracotta/40 group-hover:text-terracotta group-hover:translate-x-0.5">
                    <ArrowRight size={14} />
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
