"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";

const CARD_BORDER_HOVER = [
  "group-hover:border-[#0057FF]/40",
  "group-hover:border-[#189b93]/40",
  "group-hover:border-[#0a2a6b]/40",
  "group-hover:border-[#0057FF]/40",
  "group-hover:border-[#189b93]/40",
  "group-hover:border-[#0a2a6b]/40",
];

export default function Process() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const products = t.process.products;
  const selectedProduct = openIndex !== null ? products[openIndex] : null;

  const panelVariants = {
    hidden: { opacity: 0, x: 15 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 15 },
  };

  return (
    <section
      id="proceso"
      className="relative z-10 overflow-hidden px-6 py-24 sm:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/40 via-blue-50/10 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-[8%] h-[420px] w-[420px] rounded-full border-[2px] border-[#0057FF]/30 sm:h-[520px] sm:w-[520px]" />
        <div className="absolute -left-24 top-[14%] h-[300px] w-[300px] rounded-full border-[2px] border-[#0057FF]/25 sm:h-[360px] sm:w-[360px]" />
        <div className="absolute -left-32 top-[10%] h-[380px] w-[380px] rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute -right-44 top-[45%] h-[460px] w-[460px] rounded-full border-[2px] border-[#189b93]/30 sm:h-[580px] sm:w-[580px]" />
        <div className="absolute -right-28 top-[52%] h-[320px] w-[320px] rounded-full border-[2px] border-[#189b93]/25 sm:h-[380px] sm:w-[380px]" />
        <div className="absolute -right-36 top-[48%] h-[400px] w-[400px] rounded-full bg-teal-400/15 blur-3xl" />
        <div className="absolute right-[8%] top-[5%] hidden h-24 w-24 rounded-full border-[2px] border-[#0a2a6b]/25 sm:block" />
        <div className="absolute left-[20%] top-0 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute right-[15%] bottom-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal variant="up">
          <div className="mx-auto max-w-xl text-center mb-16">
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
              {t.process.title}
            </h2>
            <p className="mt-5 text-ink-soft">{t.process.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div
            className={`grid gap-x-8 gap-y-10 w-full ${
              selectedProduct
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {products.map((product, index) => {
              const isOpen = openIndex === index;

              return (
                <ScrollReveal
                  key={product.id}
                  variant="up"
                  delay={(index % (selectedProduct ? 2 : 3)) * 80}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={`group relative w-full text-left flex flex-col h-full items-start border-b pb-8 transition-all duration-200 cursor-pointer ${
                      isOpen
                        ? "border-terracotta shadow-md rounded-2xl p-6 bg-white"
                        : "border-line p-0 bg-transparent hover:border-terracotta/50"
                    } ${!isOpen && CARD_BORDER_HOVER[index % CARD_BORDER_HOVER.length]}`}
                  >
                    <div className="mt-6 w-full">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                        {product.num}
                      </span>
                      <h3 className="mt-1 font-display text-xl text-ink">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-ink-soft">{product.tag}</p>
                    </div>

                    {!isOpen && (
                      <p className="mt-4 text-sm leading-relaxed text-ink-soft line-clamp-2">
                        {product.queEs}
                      </p>
                    )}

                    <div className="flex-grow" />

                    <div className="mt-6 flex w-full items-center justify-between">
                      <span className="text-xs font-medium text-ink-faint group-hover:text-terracotta transition-colors duration-200">
                        {isOpen
                          ? t.process.hideDetail
                          : t.process.showDetail}
                      </span>
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 ${
                          isOpen
                            ? "bg-terracotta border-terracotta text-cream rotate-180"
                            : "border-line text-ink-faint group-hover:border-terracotta/40 group-hover:text-terracotta group-hover:translate-x-0.5"
                        }`}
                      >
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {selectedProduct && (
              <motion.div
                key={selectedProduct.id}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full lg:max-w-xl xl:max-w-2xl shrink-0 lg:sticky lg:top-28 self-start"
              >
                <div className="overflow-hidden rounded-[32px] border border-line bg-white p-8 shadow-[0_12px_34px_rgba(10,42,107,0.08)] sm:p-10">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-2xl">
                      <div className="text-sm font-medium uppercase tracking-[0.16em] text-terracotta">
                        {selectedProduct.tag}
                      </div>
                      <h3 className="mt-2 font-display text-3xl text-ink">
                        {selectedProduct.name}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenIndex(null)}
                      aria-label={t.process.closeAria}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-white text-ink transition hover:border-ink hover:bg-ink hover:text-cream cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">
                        {t.process.queEsLabel}
                      </div>
                      <p className="mt-3 text-base leading-7 text-ink-soft">
                        {selectedProduct.queEs}
                      </p>
                    </div>
                    <div>
                      <div className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">
                        {t.process.paraQueLabel}
                      </div>
                      <p className="mt-3 text-base leading-7 text-ink-soft">
                        {selectedProduct.paraQue}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex flex-col gap-2 shrink-0">
                      <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">
                        {t.process.duracionLabel}
                      </span>
                      <div className="inline-flex items-center rounded-xl bg-cream px-4 py-2.5 text-sm font-semibold text-ink w-fit">
                        {selectedProduct.duracion}
                      </div>
                    </div>
                    {selectedProduct.entregables.length > 0 && (
                      <div className="flex flex-col gap-2 flex-grow sm:items-end">
                        <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">
                          {t.process.entregablesLabel}
                        </span>
                        <div className="flex flex-wrap gap-2 sm:justify-end">
                          {selectedProduct.entregables.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-ink/10 bg-cream px-3.5 py-1.5 text-xs text-ink"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedProduct.restrictions.length > 0 && (
                    <div className="mt-8 rounded-[20px] border border-line bg-cream/60 p-6">
                      <div className="text-xs font-medium uppercase tracking-[0.16em] text-ink-faint">
                        {t.process.restrictionsLabel}
                      </div>
                      <ul className="mt-4 space-y-3">
                        {selectedProduct.restrictions.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-7 text-ink"
                          >
                            <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink-faint" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}