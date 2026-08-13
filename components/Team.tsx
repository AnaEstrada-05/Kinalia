"use client";

import { useLanguage } from "./LanguageContext";
import ScrollReveal from "./ScrollReveal";

const TEAM_PHOTOS: string[] = [];

export default function Team() {
  const { t } = useLanguage();
  const members = t.team.members;

  return (
    <section
      id="equipo"
      className="relative overflow-hidden px-6 py-28 sm:px-8 border-t border-line"
    >
      <div className="mx-auto max-w-7xl">
        {/* Cabecera */}
        <ScrollReveal variant="up">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.16em] text-ink-faint">
              {t.team.eyebrow}
            </span>
            <h2 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
              {t.team.title}
            </h2>
          </div>
        </ScrollReveal>

        {/* Cuadrícula de 4 columnas */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Tarjeta de llamada a la acción */}
          <ScrollReveal variant="up" delay={0}>
            <div className="h-full flex flex-col justify-between rounded-[32px] bg-[#0057FF] p-8 text-white shadow-lg relative overflow-hidden">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-white/80">
                  {t.team.ctaCard.label}
                </span>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl leading-snug">
                  {t.team.ctaCard.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/90">
                  {t.team.ctaCard.description}
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="#contacto"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0057FF] transition-transform duration-200 hover:scale-105 shadow-sm"
                >
                  {t.team.ctaCard.button}
                </a>
              </div>

              <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-white/15 blur-xl pointer-events-none" />
            </div>
          </ScrollReveal>

          {/* Tarjetas individuales de los miembros */}
          {members.map((member, index) => {
            const photoUrl = TEAM_PHOTOS[index % TEAM_PHOTOS.length];
            return (
              <ScrollReveal
                key={`${member.name}-${index}`}
                variant="up"
                delay={(index + 1) * 80}
              >
                <div className="group h-full flex flex-col justify-between">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[32px] bg-line shadow-sm">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-line">
                        <span className="font-display text-4xl text-ink-faint">
                          {member.initials}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between px-2">
                    <span className="font-display text-lg text-ink">
                      {member.name}
                    </span>
                  </div>

                  <p className="px-2 text-xs font-mono text-ink-faint uppercase tracking-wider mt-0.5">
                    {member.role}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}