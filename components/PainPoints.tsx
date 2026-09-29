"use client";

import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";

// Small hand-drawn data visuals — one per pain point, not stock icons — that
// echo what the stat above them is actually saying.
function BarsMini({ className = "" }: { className?: string }) {
  return (
    <svg width="44" height="30" viewBox="0 0 44 30" fill="none" className={className}>
      <rect x="0" y="18" width="7" height="12" rx="2" fill="currentColor" opacity="0.35" />
      <rect x="12" y="12" width="7" height="18" rx="2" fill="currentColor" opacity="0.6" />
      <rect x="24" y="6" width="7" height="24" rx="2" fill="currentColor" opacity="0.85" />
      <rect x="36" y="0" width="7" height="30" rx="2" fill="currentColor" />
    </svg>
  );
}
function StackMini({ className = "" }: { className?: string }) {
  return (
    <svg width="44" height="30" viewBox="0 0 44 30" fill="none" className={className}>
      <rect x="0" y="3" width="13" height="24" rx="4" fill="currentColor" opacity="0.35" />
      <rect x="15.5" y="3" width="13" height="24" rx="4" fill="currentColor" opacity="0.35" />
      <rect x="31" y="3" width="13" height="24" rx="4" fill="currentColor" opacity="0.35" />
    </svg>
  );
}
function TrendDownMini({ className = "" }: { className?: string }) {
  return (
    <svg width="44" height="30" viewBox="0 0 44 30" fill="none" className={className}>
      <path
        d="M1 3 L13 12 L22 9 L32 22 L43 27"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="43" cy="27" r="3" fill="currentColor" />
    </svg>
  );
}

const VISUALS = [BarsMini, StackMini, TrendDownMini];

const CARD_STYLES = [
  {
    wrap: "border-terracotta/20 bg-terracotta/[0.06]",
    stat: "text-terracotta",
    title: "text-ink",
    desc: "text-ink-soft",
  },
  {
    wrap: "border-teal-dark/20 bg-teal/[0.08]",
    stat: "text-teal-dark",
    title: "text-ink",
    desc: "text-ink-soft",
  },
  {
    wrap: "border-transparent bg-forest",
    stat: "text-cream",
    title: "text-cream",
    desc: "text-cream/65",
  },
] as const;

export default function PainPoints() {
  const { t } = useLanguage();
  const problems = t.painPoints.items;

  return (
    <section
      id="soluciones"
      className="relative overflow-hidden px-6 pt-24 pb-10 sm:px-8 sm:pt-28 md:px-14"
    >
      {/* Ambient blobs — same visual language as Hero/Process, so the page
          reads as one continuous atmosphere instead of separate sections. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/40 via-blue-50/10 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-[6%] h-[380px] w-[380px] rounded-full border-[2px] border-[#0057FF]/25 sm:h-[460px] sm:w-[460px]" />
        <div className="absolute -left-24 top-[10%] h-[280px] w-[280px] rounded-full bg-blue-400/12 blur-3xl" />
        <div className="absolute -right-36 bottom-[0%] h-[380px] w-[380px] rounded-full border-[2px] border-[#189b93]/25 sm:h-[460px] sm:w-[460px]" />
        <div className="absolute -right-20 bottom-[4%] h-[280px] w-[280px] rounded-full bg-teal-400/12 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal variant="up">
          <div className="mx-auto max-w-3xl text-center mb-20">
            <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {t.painPoints.title}
            </h2>
            <p className="mt-6 text-lg text-ink-soft">
              {t.painPoints.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {problems.map((item, index) => {
            const Visual = VISUALS[index % VISUALS.length];
            const style = CARD_STYLES[index % CARD_STYLES.length];
            return (
              <ScrollReveal key={item.num} variant="up" delay={index * 120}>
                <div
                  className={`card-hover-lift flex h-full flex-col gap-8 rounded-[32px] border p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] ${style.wrap}`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`font-display text-5xl ${style.stat}`}>
                      {item.num.replace(".", "")}
                    </span>
                    <Visual className={style.stat} />
                  </div>

                  <div>
                    <h3 className={`font-display text-2xl ${style.title}`}>
                      {item.title}
                    </h3>
                    <p className={`mt-3 text-sm leading-relaxed ${style.desc}`}>
                      {item.description}
                    </p>
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
