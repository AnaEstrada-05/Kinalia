import Image from "next/image";
import Reveal from "./Reveal";
import type { Copy } from "./copy";
import { Eyebrow, h2Class, wrap } from "./ui";

// Crossplay + licenciamiento sin internet, unidos en un solo argumento:
// funciona donde no hay senal.
export default function Crossplay({ c }: { c: Copy["crossplay"] }) {
  return (
    <section
      id="crossplay"
      className="scroll-mt-16 bg-rm-ink-2 py-20 text-rm-sand sm:py-[100px]"
    >
      <div className={wrap}>
        <div className="grid grid-cols-1 items-center gap-11 min-[861px]:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
              <Image
                src="/rope-master/crossplay.jpg"
                alt={c.imageAlt}
                fill
                sizes="(min-width: 1160px) 560px, (min-width: 861px) 48vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(10,9,8,.85))]"
              />
              <ul className="absolute inset-x-4 bottom-4 z-[2] flex flex-wrap gap-2">
                {c.network.map((n) => (
                  <li
                    key={n.label}
                    className={`rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-sm ${
                      n.host
                        ? "border-rm-rope bg-rm-rope text-white"
                        : "border-white/25 bg-rm-ink/70 text-white"
                    }`}
                  >
                    {n.label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-[18px]">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 className={h2Class}>{c.title}</h2>
            <p className="max-w-[60ch] text-[clamp(1.05rem,1.6vw,1.25rem)] text-[#c9bfae]">
              {c.lead}
            </p>
            <dl className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
              {c.facts.map((f) => (
                <div key={f.value} className="border-t-2 border-rm-rope pt-3">
                  <dt className="font-rm-display text-[1.9rem] font-extrabold text-rm-rope [text-shadow:0_0_6px_rgba(242,112,26,.85),0_0_22px_rgba(242,112,26,.45)]">
                    {f.value}
                  </dt>
                  <dd className="text-[14.5px] text-[#c9bfae]">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
