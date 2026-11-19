import type { ReactNode } from "react";
import Reveal from "./Reveal";
import type { Tone } from "./copy";

// Piezas compartidas por las secciones de la landing de Rope Master.

export const wrap = "mx-auto w-full max-w-[1160px] px-5";

const btn =
  "inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-transparent px-[26px] py-3.5 text-base font-bold transition duration-150 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0";
export const btnMain = `${btn} bg-rm-rope text-rm-ink shadow-[0_0_60px_-12px_rgba(242,112,26,.55)] hover:bg-rm-rope-soft hover:shadow-[0_0_60px_-8px_rgba(242,112,26,.7)]`;
export const btnGhost = `${btn} border-white/35 text-rm-sand hover:border-rm-rope hover:text-rm-rope-soft`;
export const btnLight = `${btn} border-white text-white`;

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-xs font-medium uppercase tracking-[.14em] text-rm-rope ${className}`}
    >
      {children}
    </span>
  );
}

export const h2Class =
  "font-rm-display text-[clamp(1.8rem,4.4vw,3rem)] font-extrabold uppercase leading-[1.08] tracking-[-.01em] text-balance";

export function SectionHead({
  eyebrow,
  title,
  lead,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-12 flex flex-col items-center gap-3.5 text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={h2Class}>{title}</h2>
      {lead ? (
        <p
          className={`mx-auto max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.25rem)] ${
            dark ? "text-[#c9bfae]" : "text-rm-dim"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

const pillTone: Record<Tone, string> = {
  ok: "bg-[#dff3e6] text-[#1d6e3f]",
  warn: "bg-[#ffe6d1] text-[#b94f06]",
  muted: "bg-rm-sand-2 text-rm-dim",
};

export function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`w-fit rounded-full px-[9px] py-0.5 font-mono text-[11px] ${pillTone[tone]}`}
    >
      {children}
    </span>
  );
}

/** Pone el prefijo de idioma a rutas internas; deja intactos # y mailto. */
export function localeHref(locale: string, href: string) {
  return href.startsWith("/") ? `/${locale}${href}` : href;
}
