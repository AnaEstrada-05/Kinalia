import Reveal from "./Reveal";
import type { Copy } from "./copy";
import { SectionHead, wrap } from "./ui";

// Franja de ventas: el problema en palabras del organizador.
export default function BeforeAfter({ c }: { c: Copy["contrast"] }) {
  return (
    <section className="pb-20 pt-6 sm:pb-[100px] sm:pt-10">
      <div className={wrap}>
        <SectionHead eyebrow={c.eyebrow} title={c.title} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          <Reveal className="flex flex-col gap-3.5 rounded-[18px] bg-rm-sand-2 p-[30px]">
            <h3 className="font-rm-display text-[1.35rem] font-bold uppercase leading-tight">
              {c.bad.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {c.bad.items.map((i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span aria-hidden className="font-bold text-[#b3412b]">
                    ✕
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            delay={120}
            className="flex flex-col gap-3.5 rounded-[18px] bg-rm-ink p-[30px] text-rm-sand shadow-[0_30px_60px_-30px_rgba(10,9,8,.6)]"
          >
            <h3 className="font-rm-display text-[1.35rem] font-bold uppercase leading-tight">
              {c.good.title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {c.good.items.map((i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span aria-hidden className="font-bold text-rm-rope-soft">
                    ✓
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
