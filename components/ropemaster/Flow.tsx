import Reveal from "./Reveal";
import type { Copy } from "./copy";
import { SectionHead, wrap } from "./ui";

// Los cuatro pasos de la guia "Como armar un evento". Numerados porque el
// orden importa; el conector punteado solo aparece cuando caben en una fila.
export default function Flow({ c }: { c: Copy["flow"] }) {
  return (
    <section id="flujo" className="bg-rm-ink py-20 text-rm-sand sm:py-[100px]">
      <div className={wrap}>
        <SectionHead eyebrow={c.eyebrow} title={c.title} />
        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {c.steps.map((s, i) => (
            <li
              key={s.title}
              className="relative flex flex-col gap-2.5 py-2 lg:pr-[26px] lg:after:absolute lg:after:left-14 lg:after:right-2 lg:after:top-[30px] lg:after:h-0.5 lg:after:bg-[repeating-linear-gradient(90deg,#2e2720_0_6px,transparent_6px_12px)] lg:last:after:hidden"
            >
              <Reveal delay={i * 90} className="flex flex-col gap-2.5">
                <span className="grid size-11 place-items-center rounded-full bg-rm-rope font-rm-display font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="font-rm-display text-[1.15rem] font-bold leading-tight">
                  {s.title}
                </h3>
                <p className="text-[15.5px] text-[#c9bfae]">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
