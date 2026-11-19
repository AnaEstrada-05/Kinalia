import Image from "next/image";
import type { Copy } from "./copy";

// Pagina "Proximamente" de Rope Master (misma que habia en HTML, ahora en
// React). Se muestra mientras COMING_SOON sea true en
// app/[locale]/productos/ropemaster/page.tsx.
const rise = (delay: number) => ({ animationDelay: `${delay}s` });

export default function ComingSoon({ c }: { c: Copy["comingSoon"] }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-7 overflow-hidden bg-rm-ink px-6 py-12 text-center text-rm-sand">
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/rope-master/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_62%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,8,.55)_0%,rgba(10,9,8,.68)_50%,rgba(10,9,8,.96)_100%)]" />
      </div>

      <div
        className="rm-rise relative rounded-[14px] bg-rm-sand px-6 py-4 shadow-[0_0_60px_-12px_rgba(242,112,26,.55)]"
        style={rise(0)}
      >
        <Image
          src="/assets/ropemaster-logo.png"
          alt="Rope Master"
          width={230}
          height={115}
          priority
          className="block h-auto w-[clamp(150px,28vw,230px)]"
        />
      </div>

      <h1
        className="rm-rise relative font-rm-display text-[clamp(2.6rem,9vw,6rem)] font-extrabold uppercase leading-[1.05]"
        style={rise(0.2)}
      >
        {c.titleStart}
        <span className="text-rm-rope">{c.titleEm}</span>
      </h1>

      <p
        className="rm-rise relative max-w-[34rem] text-[clamp(1rem,2.4vw,1.25rem)] leading-normal text-[#d8cfc0]"
        style={rise(0.3)}
      >
        {c.text}
      </p>
      {c.note ? (
        <p
          className="rm-rise relative max-w-[34rem] text-[.95rem] leading-normal text-[#d8cfc0] opacity-75"
          style={rise(0.4)}
        >
          {c.note}
        </p>
      ) : null}
    </main>
  );
}
