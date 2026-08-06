"use client";

import { useLanguage } from "./LanguageContext";

export default function ServicesCards() {
  const { t } = useLanguage();

  return (
    <ul className="grid grid-cols-3 gap-3 sm:gap-4">
      {t.services.map((service) => (
        <li
          key={service.initial}
          className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-card px-3 py-6 text-center shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest font-display text-sm text-cream transition-all duration-300 hover:scale-105">
            {service.initial}
          </span>
          <p className="text-xs font-medium leading-snug text-ink sm:text-sm">
            {service.title}
          </p>
        </li>
      ))}
    </ul>
  );
}