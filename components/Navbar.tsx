"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { openCalendlyModal } from "./CalendlyModal";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const { t, locale, toggleLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#productos", label: t.nav.productos },
    { href: "#nosotros", label: t.nav.nosotros },
    { href: "#contacto", label: t.nav.contacto },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-cream/90 backdrop-blur-sm"
          : "border-transparent bg-cream"
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-1"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-ink transition-all duration-300 hover:opacity-90"
          aria-label="Kinalia — inicio"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink font-display text-sm transition-all duration-300 hover:-translate-y-0.5">
            K
          </span>
          <span className="font-display text-lg tracking-tight">Kinalia</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-ink-soft transition-all duration-300 hover:text-ink hover:-translate-y-0.5"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink-soft transition-colors hover:border-ink hover:text-ink"
            aria-label={t.nav.langAria}
          >
            {t.nav.langLabel}
          </button>
          <button
            type="button"
            onClick={openCalendlyModal}
            className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-terracotta-dark"
          >
            {t.nav.cta}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleLocale}
            className="flex h-9 items-center justify-center rounded-full border border-line px-3 font-mono text-xs text-ink-soft transition-colors hover:border-ink hover:text-ink"
            aria-label={t.nav.langAria}
          >
            {t.nav.langLabel}
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 hover:border-ink hover:bg-cream"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path
                d={mobileOpen ? "M1 1L17 13M17 1L1 13" : "M0 1H18M0 7H18M0 13H18"}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-line bg-cream px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              openCalendlyModal();
            }}
            className="mt-5 w-full rounded-full bg-terracotta px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-terracotta-dark"
          >
            {t.nav.cta}
          </button>
        </div>
      )}
    </header>
  );
}