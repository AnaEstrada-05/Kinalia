"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import CallButton from "./CallButton";
import { openCalendlyModal } from "./CalendlyModal";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [onHero, setOnHero] = useState(true);
  const [productsOpen, setProductsOpen] = useState(false);

  const navVariants: Variants = {
    hidden: { opacity: 0, y: -20, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 22, stiffness: 180, delay: 0.05 },
    },
  };

  const navRef = useRef<HTMLElement | null>(null);
  const productsRef = useRef<HTMLDivElement | null>(null);

  // Close the Productos dropdown on outside click (covers touch/keyboard,
  // not just mouseleave) and on Escape.
  useEffect(() => {
    if (!productsOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        productsRef.current &&
        !productsRef.current.contains(e.target as Node)
      ) {
        setProductsOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setProductsOpen(false);
    }
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [productsOpen]);

  useEffect(() => {
    const candidates = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]")
    );
    if (candidates.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (!best) return;
        const theme = best.target.getAttribute("data-nav-theme");
        setOnHero(best.isIntersecting && theme === "hero");
      },
      {
        root: null,
        rootMargin: "-80px 0px 0px 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    candidates.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  const links = [
    { label: t.nav.proceso, href: "#proceso" },
    { label: t.nav.nosotros, href: "#proceso" },
    { label: t.nav.contacto, href: "#contacto" },
  ];

  return (
    <motion.nav
      ref={navRef as any}
      variants={navVariants}
      initial="hidden"
      animate="show"
      className={`fixed top-0 left-0 right-0 z-50 flex h-20 w-full items-center justify-between px-6 backdrop-blur-md transition-colors duration-300 sm:px-10 md:px-12 lg:px-14 ${
        onHero
          ? "bg-transparent text-white"
          : "bg-white text-neutral-900 shadow-sm"
      }`}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <a href={`/${locale}`} className="flex items-center">
        <img
          src={`/assets/kinalia-lockup-${onHero ? "white" : "color"}.svg`}
          alt="Kinalia Logo"
          className="h-10 w-auto block"
        />
      </a>

      {/* Enlaces */}
      <nav
        className="hidden items-center gap-10 md:flex"
        aria-label="Primary navigation"
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={`flex items-center text-[14px] font-normal transition-colors duration-200 ${
              onHero
                ? "text-white/90 hover:text-cream hover:[text-shadow:0_6px_24px_rgba(0,0,0,0.55)]"
                : "text-neutral-900/90 hover:text-terracotta"
            }`}
          >
            {link.label}
          </a>
        ))}

        {/* Productos: dropdown con el/los logo(s) de producto.
            Click-to-toggle (no hover): el panel es position:absolute, así que
            no forma parte de la caja del contenedor "relative" — con hover,
            mover el mouse del botón hacia el panel lo cierra a medio camino. */}
        <div ref={productsRef} className="relative">
          <button
            type="button"
            onClick={() => setProductsOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={productsOpen}
            className={`flex items-center gap-1 text-[14px] font-normal transition-colors duration-200 ${
              onHero
                ? "text-white/90 hover:text-cream hover:[text-shadow:0_6px_24px_rgba(0,0,0,0.55)]"
                : "text-neutral-900/90 hover:text-terracotta"
            }`}
          >
            {t.nav.productos}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                productsOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {productsOpen && (
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
              <div className="w-60 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl">
                {t.products.items.map((product) => (
                <a
                  key={product.id}
                  href={`/${locale}${product.href}`}
                  onClick={() => setProductsOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-neutral-50"
                >
                  <img
                    src={product.logo}
                    alt={product.name}
                    className="h-10 w-10 shrink-0 object-contain"
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-neutral-900">
                      {product.name}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {product.tag}
                    </span>
                  </span>
                </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* CTA + Language toggle */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setLocale(locale === "es" ? "en" : "es")}
          aria-label={t.nav.langAria}
          className={`hidden sm:inline-flex h-9 items-center rounded-full border px-3 text-xs font-medium tracking-wide transition-colors ${
            onHero
              ? "border-white/30 text-white hover:bg-white/10"
              : "border-neutral-200 text-neutral-700 hover:border-terracotta hover:text-terracotta"
          }`}
        >
          {t.nav.langLabel}
        </button>

        <CallButton
          onClick={openCalendlyModal}
          className={`h-11 px-5 text-sm ${
            onHero
              ? "bg-white text-neutral-900"
              : "bg-terracotta text-cream"
          }`}
        >
          {t.nav.cta}
        </CallButton>
      </div>
    </motion.nav>
  );
}