"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { openCalendlyModal } from "./CalendlyModal";
import { useLanguage } from "./LanguageContext";
import CountUp from "./Countup";
import ScrollReveal from "./ScrollReveal";

const HeroNetworkCanvas = dynamic(() => import("./HeroNetworkCanvas"), {
  ssr: false,
});

// Per-badge personality: a slight tilt, a vertical offset (so the row
// is deliberately staggered, not left to chance line-wrapping), and a
// parallax depth multiplier so cards move at different speeds.
const BADGE_STYLE = [
  { rotate: -4, offset: 0, depth: 10 },
  { rotate: 2.5, offset: -22, depth: 16 },
  { rotate: -2, offset: 16, depth: 12 },
];

export default function Hero() {
  const { t } = useLanguage();
  const [titleLine1, titleLine2] = t.hero.title;
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [staggerEnabled, setStaggerEnabled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    // The vertical offset is a desktop-only flourish — on narrow
    // screens the badges wrap to their own line anyway, and a
    // negative margin there would overlap the row above.
    const query = window.matchMedia("(min-width: 640px)");
    const update = () => setStaggerEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const handleMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setPointer({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-20 animate-fadeUp"
    >
      {/* Signature background: nodes that drift and connect, echoing the product itself */}
      <div className="absolute inset-0 -z-0 bg-grid opacity-40" />
      <div className="absolute inset-x-0 top-0 -z-0 h-full">
        <HeroNetworkCanvas />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-full bg-gradient-to-b from-cream/0 via-cream/10 to-cream" />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="eyebrow animate-fadeUp">{t.hero.eyebrow}</p>

        <h1 className="mt-5 font-display text-[2.6rem] leading-[1.08] tracking-tight text-ink sm:text-6xl">
          <span className="block overflow-hidden">
            <span
              className="block animate-fadeUp"
              style={{ animationDelay: "80ms" }}
            >
              {titleLine1}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="block animate-fadeUp"
              style={{ animationDelay: "200ms" }}
            >
              {titleLine2}
            </span>
          </span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl text-balance text-base text-ink-soft sm:text-lg animate-fadeUp"
          style={{ animationDelay: "320ms" }}
        >
          {t.hero.subtitle}
        </p>

        <div
          className="mt-9 flex justify-center animate-fadeUp"
          style={{ animationDelay: "420ms" }}
        >
          <button
            type="button"
            onClick={openCalendlyModal}
            className="group relative"
          >
            {/* Idle pulse ring — a quiet "this is live" cue behind the CTA */}
            <span className="animate-pulseSoft absolute inset-0 -z-10 rounded-full bg-terracotta/40 blur-md" />
            <span className="relative overflow-hidden block rounded-full bg-terracotta px-7 py-3.5 text-sm font-medium text-cream shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-terracotta-dark group-hover:shadow-lg sm:text-base">
              <span className="relative z-10">{t.hero.cta}</span>
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
            </span>
          </button>
        </div>

        {/* Floating badges — deliberately staggered, tilted, parallaxed,
            and counting up on scroll. Same layout in every language:
            the stagger comes from a fixed offset per card, not from
            where the text happens to wrap. */}
        <div className="relative mt-20 flex flex-wrap items-start justify-center gap-5 sm:gap-8">
          {t.hero.badges.map((badge, index) => {
            const style = BADGE_STYLE[index % BADGE_STYLE.length];
            const translateX = pointer.x * style.depth;
            const translateY = pointer.y * style.depth * 0.6;
            return (
              <ScrollReveal
                key={badge.label}
                variant={index === 1 ? "scale" : index === 0 ? "left" : "right"}
                delay={index * 130}
              >
                {/* Outer: fixed stagger offset, never fights the float animation */}
                <div style={{ marginTop: staggerEnabled ? style.offset : 0 }}>
                  {/* Middle: owns the CSS float-bob animation (its own transform) */}
                  <div
                    className="animate-float"
                    style={{ animationDelay: `${index * 0.6}s` }}
                  >
                    {/* Inner: owns the tilt + pointer parallax (a different transform) */}
                    <div
                      className="rounded-2xl border border-line bg-white/70 px-5 py-4 text-left shadow-[0_8px_24px_rgba(26,46,31,0.08)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(193,96,60,0.16)]"
                      style={{
                        transform: `rotate(${style.rotate}deg) translate3d(${translateX}px, ${translateY}px, 0)`,
                        transition: "transform 0.2s ease-out",
                      }}
                    >
                      <div
                        className="font-display text-2xl text-ink"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                      >
                        <CountUp value={badge.value} />
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                        <span className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                        {badge.label}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}