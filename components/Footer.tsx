"use client";

import { openCalendlyModal } from "./CalendlyModal";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contacto">
      <div className="bg-forest px-6 py-24 text-center text-cream sm:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            {t.footer.heading}
          </h2>
          <p className="mt-4 text-cream/70">{t.footer.subheading}</p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={openCalendlyModal}
              className="rounded-full bg-terracotta px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-terracotta-dark sm:text-base"
            >
              {t.footer.cta}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-forest-soft px-6 py-10 text-cream/70 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cream/40 font-display text-xs text-cream">
              K
            </span>
            <span className="text-sm text-cream">{t.footer.tagline}</span>
          </div>

          <div className="flex flex-col items-center gap-1 text-sm sm:items-end">
            <a
              href="mailto:hola@kinalia.ai"
              className="transition-colors hover:text-cream"
            >
              hola@kinalia.ai
            </a>
            <span>
              © {new Date().getFullYear()} {t.footer.rights}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}