"use client";

import { ArrowRight } from "lucide-react";
import { openCalendlyModal } from "./CalendlyModal";
import { useLanguage } from "./LanguageContext";

export default function CtaBanner() {
  const { t } = useLanguage();

  return (
    <section className="px-6 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative isolate flex flex-col items-center justify-between gap-8 overflow-hidden rounded-[32px] border border-terracotta/15 bg-forest p-8 shadow-[0_12px_40px_rgba(10,42,107,0.18)] md:flex-row md:gap-12 md:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="hero-blob animate-blobDrift pointer-events-none absolute -left-16 top-1/2 -z-0 h-72 w-72 -translate-y-1/2 rounded-full bg-terracotta/40"
          />
          <div
            aria-hidden="true"
            className="hero-blob animate-blobDrift-slow pointer-events-none absolute -right-20 -bottom-16 -z-0 h-80 w-80 rounded-full bg-teal-dark/35"
          />

          <div className="relative z-10 max-w-lg text-center md:text-left">
            <h2 className="font-display text-2xl leading-tight tracking-tight text-cream sm:text-4xl">
              {t.ctaBanner.title}
            </h2>
            <p className="mt-3 text-cream/65">{t.ctaBanner.description}</p>
          </div>

          <button
            type="button"
            onClick={openCalendlyModal}
            className="group relative z-10 flex h-12 shrink-0 items-center gap-2.5 rounded-full bg-cream px-7 text-sm font-medium text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] sm:text-base"
          >
            {t.ctaBanner.cta}
          </button>
        </div>
      </div>
    </section>
  );
}