import Reveal from "./Reveal";
import type { Copy } from "./copy";
import { SectionHead, wrap } from "./ui";

// Modos de juego. La tarjeta con `star` es la destacada (Lazada Sorteada) y
// la que lleva `soon` se muestra como "en desarrollo".
export default function Modes({ c }: { c: Copy["modes"] }) {
  return (
    <section
      id="modos"
      className="scroll-mt-16 bg-rm-ink py-20 text-rm-sand sm:py-[100px]"
    >
      <div className={wrap}>
        <SectionHead eyebrow={c.eyebrow} title={c.title} lead={c.lead} dark />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(290px,100%),1fr))] gap-5">
          {c.items.map((m, i) => (
            <Reveal
              key={m.key}
              delay={i * 90}
              className={`relative flex flex-col gap-3.5 overflow-hidden rounded-[20px] border p-7 ${
                m.star
                  ? "border-[#5b3a1d] bg-[linear-gradient(160deg,#3a2210_0%,#221c17_55%)] shadow-[0_0_0_1px_rgba(242,112,26,.35),0_30px_60px_-30px_rgba(242,112,26,.45)]"
                  : "border-rm-line-dark bg-rm-ink-3"
              }`}
            >
              <div
                aria-hidden
                className="grid size-[46px] place-items-center rounded-xl bg-rm-rope/15 font-rm-display font-extrabold text-rm-rope-soft"
              >
                {m.icon}
              </div>
              <h3 className="font-rm-display text-[1.15rem] font-bold leading-tight">
                {m.title}
              </h3>
              {m.soon ? (
                <span className="w-fit rounded-full bg-[#2a241d] px-[9px] py-[3px] font-mono text-[11px] text-[#bdb4a2]">
                  {m.soon}
                </span>
              ) : null}
              <p className="text-[15.5px] text-[#c9bfae]">{m.text}</p>

              {m.planbox.toggle ? (
                <div className="mt-1 flex flex-col gap-2.5 rounded-xl border border-[#4a3220] bg-[#120e0b] p-3.5 text-[13.5px]">
                  <div className="flex items-center gap-2.5 font-bold text-white">
                    <span
                      aria-hidden
                      className="relative h-[22px] w-[38px] flex-none rounded-full bg-rm-rope after:absolute after:right-[3px] after:top-[3px] after:size-4 after:rounded-full after:bg-white after:content-['']"
                    />
                    {m.planbox.toggle}
                  </div>
                  {m.planbox.result ? (
                    <div className="font-mono text-xs text-[#c9bfae]">
                      {m.planbox.result}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {m.chips.length ? (
                <ul className="mt-0.5 flex flex-wrap gap-1.5">
                  {m.chips.map((chip) => (
                    <li
                      key={chip}
                      className={`rounded-full border px-2.5 py-1 font-mono text-[11.5px] ${
                        m.star
                          ? "border-rm-rope/60 text-[#ffd2ae]"
                          : "border-[#4a4034] text-[#e6dccb]"
                      }`}
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
