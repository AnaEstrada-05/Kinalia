"use client";

import ServicesCards from "./ServicesCards";
import Team from "./Team";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "./LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="nosotros" className="px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <ScrollReveal variant="left">
            <div>
              <p className="eyebrow">{t.about.eyebrow}</p>
              <h2 className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl">
                {t.about.title}
              </h2>
              <p className="mt-5 max-w-md text-ink-soft transition-all duration-500">
                {t.about.intro}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="right" delay={100}>
            <ServicesCards />
          </ScrollReveal>
        </div>

        {/* Relatable phrases — real objections, answered in Kinalia's voice */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {t.about.phrases.map((phrase, index) => (
            <ScrollReveal
              key={phrase.line}
              variant={index % 2 === 0 ? "left" : "right"}
              delay={index * 90}
            >
              <div className="h-full rounded-[24px] border border-line bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-lg">
                <p className="font-display text-lg leading-snug text-ink">
                  {phrase.line}
                </p>
                <div className="mt-4 flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-terracotta" />
                  <p className="text-sm leading-6 text-ink-soft">{phrase.reply}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <Team />
      </div>
    </section>
  );
}