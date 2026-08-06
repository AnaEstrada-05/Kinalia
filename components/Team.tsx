"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageContext";
import ScrollReveal from "./ScrollReveal";

/**
 * Drop real team photos in /public/team/ and update `photo` below —
 * placeholders render as initials on a gradient until then, so the
 * layout never looks broken while photos are pending.
 */
const PHOTOS: (string | null)[] = [null, null, null];

export default function Team() {
  const { t } = useLanguage();
  const members = t.team.members;

  return (
    <div className="mt-20">
      <ScrollReveal variant="up">
        <div className="text-center">
          <h3 className="font-display text-2xl text-ink sm:text-3xl">
            {t.about.teamHeading}
          </h3>
          <p className="mt-2 text-sm text-ink-soft">{t.about.teamSubheading}</p>
        </div>
      </ScrollReveal>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {members.map((member, index) => {
          const photo = PHOTOS[index];
          return (
            <ScrollReveal key={`${member.name}-${index}`} variant="scale" delay={index * 100}>
              <div className="group relative overflow-hidden rounded-[24px] border border-line bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-forest">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-forest to-forest-soft">
                      <span className="font-display text-4xl text-cream/90">
                        {member.initials}
                      </span>
                    </div>
                  )}
                  {/* Futuristic scan-line sweep on hover */}
                  <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-terracotta/0 via-terracotta/25 to-terracotta/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-5 text-left">
                  <div className="font-medium text-ink">{member.name}</div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-ink-faint">
                    {member.role}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}