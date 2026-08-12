"use client";

import { useState } from "react";
import { Database, Cpu, Compass, type LucideIcon } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const ICONS: LucideIcon[] = [Database, Cpu, Compass];

export default function Services() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {t.services.map((service, index) => {
        const Icon = ICONS[index % ICONS.length];
        const isActive = active === index;
        return (
          <li
            key={service.initial}
            onMouseEnter={() => setActive(index)}
            className={`card-hover-lift flex cursor-default flex-col gap-4 rounded-[22px] border p-5 text-left ${
              isActive
                ? "border-terracotta bg-terracotta text-cream"
                : "border-line bg-card text-ink"
            }`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isActive ? "bg-cream/20" : "bg-forest text-cream"
              }`}
            >
              <Icon size={30} className={isActive ? "text-cream" : "text-cream"} />
            </span>
            <div>
              <p className="text-sm font-medium sm:text-base">{service.title}</p>
              <p className={`mt-1.5 text-xs leading-relaxed ${isActive ? "text-cream/75" : "text-ink-soft"}`}>
                {service.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}