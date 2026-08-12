"use client";

import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";

export default function PainPoints() {
  const { t } = useLanguage();
  const problems = t.painPoints.items;

  return (
    <section
      id="soluciones"
      className="relative overflow-hidden px-6 pt-24 pb-10 sm:px-8 sm:pt-28"
    >
      <div className="mx-auto max-w-7xl">
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

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {problems.map((item, index) => (
            <ScrollReveal key={item.num} variant="up" delay={index * 120}>
              <div className="group h-full flex flex-col overflow-hidden rounded-[32px] border border-line bg-cream/40 transition-all duration-300 hover:-translate-y-2 hover:border-[#0057FF]/40 hover:shadow-xl shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <div className="relative h-64 w-full overflow-hidden bg-line">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>

                <div className="flex flex-col flex-grow justify-between p-8">
                  <div>
                    <h3 className="font-display text-2xl text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}