"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { Copy } from "./copy";
import { Pill, SectionHead, wrap } from "./ui";

type RoleId = "assistant" | "capture" | "judge" | "spectator";
// La vista del juez esta en desarrollo: se oculta por ahora. Para volver a
// mostrarla basta con poner SHOW_JUDGE en true (el texto sigue en copy.ts).
const SHOW_JUDGE = false;
const ORDER: RoleId[] = SHOW_JUDGE
  ? ["assistant", "capture", "judge", "spectator"]
  : ["assistant", "capture", "spectator"];

const mini =
  "overflow-hidden rounded-[14px] border border-rm-line bg-white text-sm";
// Capturas reales de la app (recortadas: basta con que se vea la idea).
// El juez no lleva captura: es una maqueta mientras esa vista esta en desarrollo.
const IMAGES = {
  assistant: {
    src: "/rope-master/app-roster-v2.webp",
    width: 878,
    height: 864,
    box: "",
  },
  capture: {
    src: "/rope-master/app-captura.webp",
    width: 1040,
    height: 670,
    box: "",
  },
  spectator: {
    src: "/rope-master/app-espectador.webp",
    width: 1378,
    height: 520,
    box: "",
  },
} as const;

// Pestanas por rol (asistente, captura, espectador): pestanas normales y
// accesibles, con navegacion por teclado.
export default function Roles({ c }: { c: Copy["roles"] }) {
  const [active, setActive] = useState<RoleId>("assistant");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = ORDER.indexOf(active);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % ORDER.length;
    else if (e.key === "ArrowLeft")
      next = (i - 1 + ORDER.length) % ORDER.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = ORDER.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(ORDER[next]);
    tabRefs.current[ORDER[next]]?.focus();
  };

  return (
    <section id="roles" className="scroll-mt-16 py-20 sm:py-[100px]">
      <div className={wrap}>
        <SectionHead eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

        <div
          role="tablist"
          aria-label={c.tabsLabel}
          onKeyDown={onKeyDown}
          className="mb-5 flex flex-wrap justify-center gap-2 sm:mb-[30px]"
        >
          {ORDER.map((id) => {
            const on = id === active;
            return (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[id] = el;
                }}
                role="tab"
                type="button"
                id={`rm-tab-${id}`}
                aria-selected={on}
                aria-controls={`rm-panel-${id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(id)}
                className={`cursor-pointer rounded-full border min-h-11 px-4 py-2 text-sm font-medium transition-colors ${
                  on
                    ? "border-rm-ink bg-rm-ink text-rm-sand"
                    : "border-rm-ink/15 bg-white text-[#5a5049] hover:border-rm-ink/30"
                }`}
              >
                {c.tabs[id]}
              </button>
            );
          })}
        </div>

        {ORDER.map((id) => (
          <div
            key={id}
            role="tabpanel"
            id={`rm-panel-${id}`}
            aria-labelledby={`rm-tab-${id}`}
            hidden={id !== active}
            className="grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-10 [&:not([hidden])]:grid"
          >
            <div className="max-md:order-2">{renderVisual(id, c)}</div>
            <div className="flex flex-col gap-3.5">
              {id === "judge" ? <Pill tone="warn">{c.judge.soon}</Pill> : null}
              <h3 className="font-rm-display text-[1.8rem] font-bold uppercase leading-tight">
                {c[id].title}
              </h3>
              <p className="max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.25rem)] text-rm-dim">
                {c[id].text}
              </p>
              <ul className="mt-1.5 flex flex-col gap-2 text-rm-dim">
                {c[id].bullets.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <span aria-hidden className="font-bold text-rm-rope">
                      ✓
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function renderVisual(id: RoleId, c: Copy["roles"]): ReactNode {
  if (id === "judge") return <JudgeMock m={c.judge.mock} />;
  const img = IMAGES[id];
  return (
    <figure
      className={`mx-auto w-fit max-w-full overflow-hidden rounded-[13px] ${img.box}`}
    >
      <Image
        src={img.src}
        alt={c[id].imageAlt}
        width={img.width}
        height={img.height}
        sizes="(min-width: 1160px) 600px, (min-width: 768px) 50vw, 100vw"
        className="h-auto max-h-[420px] w-auto max-w-full mix-blend-multiply"
      />
    </figure>
  );
}

function JudgeMock({ m }: { m: Copy["roles"]["judge"]["mock"] }) {
  const base = "rounded-[9px] border-[1.5px] px-4 py-[9px] text-sm font-bold";
  return (
    <div className={mini} aria-hidden>
      <div className="flex items-center justify-between gap-2.5 border-b border-rm-line bg-[#fbf8f1] px-4 py-3">
        <b className="font-rm-display">{m.heading}</b>
        <Pill tone="warn">{m.pending}</Pill>
      </div>
      <div className="flex flex-col gap-1.5 p-4">
        <b>{m.name}</b>
        <small className="text-rm-dim">{m.sub}</small>
      </div>
      <div className="flex flex-wrap gap-2 p-4 pt-0">
        <span className={`${base} border-rm-rope bg-[#fff3e8] text-[#b94f06]`}>
          {m.noTime}
        </span>
        <span className={`${base} border-[#b3412b] text-[#b3412b]`}>
          {m.dq}
        </span>
        <span className={`${base} border-rm-line`}>{m.rerun}</span>
      </div>
    </div>
  );
}
