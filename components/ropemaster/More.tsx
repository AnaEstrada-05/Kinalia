import Reveal from "./Reveal";
import type { Copy } from "./copy";
import { SectionHead, wrap } from "./ui";

const BARS = [35, 60, 45, 85, 70, 100];

// "Y ademas": lo que pasa despues del ultimo tiempo, en tarjetas tipo bento.
// Cada tarjeta puede llevar luego una captura pequena.
export default function More({ c }: { c: Copy["more"] }) {
  const card = "flex flex-col gap-2.5 rounded-[20px] border p-[26px]";
  const h3 = "font-rm-display text-[1.15rem] font-bold leading-tight";
  const big = "font-rm-display text-[2.2rem] font-extrabold leading-none";

  return (
    <section id="mas" className="py-20 sm:py-[100px]">
      <div className={wrap}>
        <SectionHead eyebrow={c.eyebrow} title={c.title} />
        <div className="grid grid-cols-1 gap-4 min-[561px]:grid-cols-2 lg:grid-cols-6">
          <Reveal
            className={`${card} border-rm-ink bg-rm-ink text-white lg:col-span-3`}
          >
            <span className={big}>{c.prizes.title}</span>
            <p className="text-[15.5px] text-[#c9bfae]">{c.prizes.text}</p>
          </Reveal>

          <Reveal
            delay={90}
            className={`${card} border-rm-line bg-white lg:col-span-3`}
          >
            <span className={big}>{c.reports.title}</span>
            <p className="text-[15.5px] text-rm-dim">{c.reports.text}</p>
            <div aria-hidden className="mt-auto flex h-16 items-end gap-[5px]">
              {BARS.map((h, i) => (
                <i
                  key={i}
                  className="flex-1 rounded-t bg-rm-rope opacity-90"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </Reveal>

          <Reveal className={`${card} border-rm-line bg-white lg:col-span-2`}>
            <h3 className={h3}>{c.backups.title}</h3>
            <p className="text-[15.5px] text-rm-dim">{c.backups.text}</p>
          </Reveal>

          <Reveal
            delay={90}
            className={`${card} border-rm-rope bg-rm-rope text-white lg:col-span-2`}
          >
            <h3 className={h3}>{c.rules.title}</h3>
            <p className="text-[15.5px] text-[#fff3e8]">{c.rules.text}</p>
          </Reveal>

          <Reveal
            delay={180}
            className={`${card} border-rm-line bg-white min-[561px]:max-lg:col-span-2 lg:col-span-2`}
          >
            <h3 className={h3}>{c.points.title}</h3>
            <p className="text-[15.5px] text-rm-dim">{c.points.text}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
