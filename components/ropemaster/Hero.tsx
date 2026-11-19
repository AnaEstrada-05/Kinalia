import Image from "next/image";
import type { Copy } from "./copy";
import LaptopMockup from "./LaptopMockup";
import { Eyebrow, btnGhost, btnMain } from "./ui";

// Hero oscuro con la foto de arena, la laptop con el dashboard flotando debajo
// (se encima un poco con el hero) y la curva que lo une con la seccion clara,
// como en la pagina anterior. El texto entra al cargar, escalonado.
const rise = (delay: number) => ({ animationDelay: `${delay}s` });

export default function Hero({ c }: { c: Copy["hero"] }) {
  return (
    <>
      <div className="bg-rm-ink">
        <section
          id="inicio"
          className="relative flex flex-col items-center overflow-hidden pb-48 pt-36 text-white sm:pb-60 sm:pt-44"
        >
          <div aria-hidden className="absolute inset-0">
            <Image
              src="/rope-master/hero.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[62%_62%] lg:object-[97%_55%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,8,.5)_0%,rgba(10,9,8,.58)_45%,rgba(10,9,8,.97)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-3xl px-5">
            <div className="flex flex-col items-center gap-[22px] text-center">
              <div className="rm-rise" style={rise(0)}>
                <Eyebrow className="!text-rm-rope-soft">{c.eyebrow}</Eyebrow>
              </div>
              <h1
                className="rm-rise max-w-[16ch] font-rm-display text-[clamp(2.2rem,6.4vw,4.6rem)] font-extrabold uppercase leading-[1.02] tracking-[-.015em] text-balance [text-shadow:0_4px_30px_rgba(0,0,0,.5)]"
                style={rise(0.08)}
              >
                {c.titleStart}{" "}
                <em className="not-italic text-rm-rope-soft">{c.titleEm}</em>
              </h1>
              <p
                className="rm-rise max-w-[54ch] text-[clamp(1.05rem,1.6vw,1.25rem)] text-[#efe7d8]"
                style={rise(0.16)}
              >
                {c.lead}
              </p>
              <div
                className="rm-rise flex flex-wrap justify-center gap-3"
                style={rise(0.24)}
              >
                <a href="#licencias" className={btnMain}>
                  {c.ctaPrimary}
                </a>
                <a href="#roles" className={btnGhost}>
                  {c.ctaSecondary}
                </a>
              </div>
              <ul
                className="rm-rise flex flex-wrap justify-center gap-x-[22px] gap-y-2.5 pt-1 font-mono text-[12.5px] uppercase tracking-[.06em] text-[#e6dccb]"
                style={rise(0.32)}
              >
                {c.proof.map((p) => (
                  <li key={p} className="flex items-center">
                    <span
                      aria-hidden
                      className="mr-2 inline-block size-[7px] rounded-full bg-rm-rope"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="relative z-20 -mt-16 px-4 sm:-mt-20 sm:px-6">
          <LaptopMockup alt={c.dashboardAlt} label={c.showcaseLabel} />
        </div>
      </div>

      {/* curva: del hero oscuro a la seccion clara */}
      <div className="relative bg-rm-sand">
        <svg
          viewBox="0 0 1440 120"
          className="block h-16 w-full sm:h-28"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,0 L1440,0 L1440,26 Q720,120 0,26 Z" fill="#0a0908" />
        </svg>
      </div>
    </>
  );
}
