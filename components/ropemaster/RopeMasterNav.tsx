"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Copy } from "./copy";
import { btnMain } from "./ui";

// Encabezado fijo sobre el hero: logo en liston (con el liston azul de Kinalia
// que se asoma al pasar el cursor), links de seccion, idioma y CTA. Al hacer
// scroll toma fondo oscuro para que se lea sobre las secciones claras.
export default function RopeMasterNav({
  c,
  locale,
}: {
  c: Copy["nav"];
  locale: "es" | "en";
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const otherLocale = locale === "es" ? "en" : "es";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Con el menu movil abierto: Escape lo cierra, la pagina de atras no hace
  // scroll y, si la pantalla crece a escritorio, se cierra solo.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => desktop.matches && setOpen(false);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  const bar = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          bar
            ? "border-b border-white/10 bg-rm-ink/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        {!bar ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-rm-ink/65 to-transparent"
          />
        ) : null}

        <div className="relative mx-auto flex h-20 w-full max-w-[1160px] items-center justify-between gap-4 px-5">
          <div className="group relative self-start">
            <a
              href={`/${locale}`}
              aria-label={c.kinaliaLabel}
              title="Kinalia"
              className="absolute -left-4 top-0 z-0"
            >
              <Ribbon fill="#0057FF" />
              <span
                className="absolute"
                style={{ left: "10%", top: "31%", width: "80%", height: "38%" }}
              >
                <Image
                  src="/assets/kinalia-lockup-white.svg"
                  alt="Kinalia"
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </span>
            </a>

            <a
              href="#inicio"
              aria-label={c.homeLabel}
              className="relative z-10 block transition-transform duration-300 ease-out group-focus-within:translate-x-11 group-hover:translate-x-11 motion-reduce:transition-none"
            >
              <Ribbon fill="#f7f3ea" stroke="rgba(10,9,8,.08)" />
              <span
                className="absolute"
                style={{
                  left: "10%",
                  top: "27.8%",
                  width: "80%",
                  height: "50%",
                }}
              >
                <Image
                  src="/assets/ropemaster-logo.png"
                  alt="Rope Master"
                  fill
                  sizes="120px"
                  priority
                  className="object-contain"
                />
              </span>
            </a>
          </div>

          <nav
            aria-label="Rope Master"
            className="hidden items-center gap-8 font-mono text-[13px] uppercase tracking-[.06em] text-rm-sand [text-shadow:0_1px_4px_rgba(0,0,0,.55)] lg:flex"
          >
            {c.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-rm-rope-soft"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`/${otherLocale}/productos/ropemaster`}
              hrefLang={otherLocale}
              aria-label={c.switchLabel}
              className="hidden rounded-full border border-white/50 px-3 py-1.5 font-mono text-xs text-white transition-colors hover:border-rm-rope-soft hover:text-rm-rope-soft sm:inline-block"
            >
              {c.switchTo}
            </a>
            <a
              href="#licencias"
              className={`${btnMain} hidden !px-5 !py-2.5 !text-sm sm:inline-flex`}
            >
              {c.buy}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="rm-mobile-menu"
              aria-label={open ? c.closeMenu : c.openMenu}
              className="flex size-11 items-center justify-center text-white lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                {open ? (
                  <>
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="rm-mobile-menu"
          className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-rm-ink/98 backdrop-blur-md lg:hidden"
        >
          <div className="flex flex-col px-6 py-8 font-mono uppercase tracking-[.06em] text-[#d8cfc0]">
            {c.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-rm-line-dark py-4"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#licencias"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-rm-rope py-3.5 text-center font-body font-bold normal-case tracking-normal text-rm-ink"
            >
              {c.buy}
            </a>
            <a
              href={`/${otherLocale}/productos/ropemaster`}
              hrefLang={otherLocale}
              className="mt-4 py-2 text-center text-xs"
            >
              {c.switchLabel}
            </a>
            <a
              href={`/${locale}`}
              className="mt-2 py-2 text-center text-xs normal-case tracking-normal text-[#a69c8d]"
            >
              &larr; {c.backToKinalia}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Ribbon({ fill, stroke }: { fill: string; stroke?: string }) {
  return (
    <svg
      viewBox="0 0 220 180"
      className="h-24 w-auto drop-shadow-lg"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0,0 L220,0 L220,150 L110,180 L0,150 Z"
        fill={fill}
        stroke={stroke ?? "rgba(247,243,234,.25)"}
        strokeWidth="1.5"
      />
    </svg>
  );
}
