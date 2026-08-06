"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";

export default function Process() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const products = t.process.products;
  const selectedProduct = openIndex !== null ? products[openIndex] : null;

  return (
    <section id="productos" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal variant="up">
          <div className="mx-auto max-w-xl text-center">
            <p className="eyebrow">{t.process.eyebrow}</p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
              {t.process.title}
            </h2>
            <p className="mt-5 text-ink-soft">{t.process.subtitle}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={100}>
          <div className="relative mt-16 px-4 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-px max-w-[90%] bg-[rgba(26,46,31,0.15)]" />
            <div className="relative grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {products.map((product, index) => {
                const isOpen = openIndex === index;
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    className="group flex flex-col items-center gap-3 rounded-[24px] bg-transparent px-3 pb-4 pt-6 text-center transition duration-300"
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full border-[1.5px] text-sm font-semibold transition duration-300 ${
                        isOpen
                          ? "border-ink bg-ink text-cream shadow-[0_0_0_4px_rgba(193,96,60,0.18)]"
                          : "border-ink/20 bg-cream text-ink group-hover:border-ink"
                      }`}
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {product.num}
                    </div>
                    <div>
                      <div className="font-medium text-ink">{product.name}</div>
                      <div className="mt-2 text-xs text-ink-soft">{product.tag}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {selectedProduct && (
          <div
            key={selectedProduct.id}
            className="animate-fadeUp overflow-hidden rounded-[10px] border border-line bg-white p-10 shadow-[0_12px_34px_rgba(26,46,31,0.08)]"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-2xl">
                <div className="text-sm font-medium uppercase tracking-[0.16em] text-terracotta">
                  {selectedProduct.tag}
                </div>
                <h3 className="mt-4 text-3xl font-display text-ink">
                  {selectedProduct.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label={t.process.closeAria}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 bg-white text-ink transition hover:border-ink hover:bg-ink hover:text-cream"
              >
                ×
              </button>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.16em] text-ink-faint">
                  {t.process.queEsLabel}
                </div>
                <p className="mt-3 text-base leading-7 text-ink-soft">
                  {selectedProduct.queEs}
                </p>
              </div>
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.16em] text-ink-faint">
                  {t.process.paraQueLabel}
                </div>
                <p className="mt-3 text-base leading-7 text-ink-soft">
                  {selectedProduct.paraQue}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium uppercase tracking-[0.16em] text-ink-faint">
                  {t.process.duracionLabel}
                </span>
                <span className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-ink">
                  {selectedProduct.duracion}
                </span>
              </div>
              {selectedProduct.entregables.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.entregables.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-ink/10 bg-cream px-4 py-2 text-sm text-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {selectedProduct.restrictions.length > 0 && (
              <div className="mt-10 rounded-[24px] border border-line bg-cream/80 p-6">
                <div className="text-sm font-medium uppercase tracking-[0.16em] text-ink-faint">
                  {t.process.restrictionsLabel}
                </div>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-ink">
                  {selectedProduct.restrictions.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-ink" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}