import Reveal from "./Reveal";
import type { Copy } from "./copy";
import { SectionHead, btnLight, btnMain, localeHref, wrap } from "./ui";

// Pendiente: definir como se compra (boton de pago, formulario o correo).
// Mientras tanto los botones de compra apuntan aqui; cambiarlo en un solo lugar.
const BUY_HREF = "#";

export default function Licenses({
  c,
  locale,
}: {
  c: Copy["licenses"];
  locale: string;
}) {
  return (
    <section
      id="licencias"
      className="scroll-mt-16 bg-rm-ink py-20 text-rm-sand sm:py-[100px]"
    >
      <div className={wrap}>
        <SectionHead eyebrow={c.eyebrow} title={c.title} lead={c.lead} dark />

        <div className="mx-auto grid max-w-[900px] grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[22px]">
          {c.plans.map((p, i) => (
            <Reveal
              key={p.key}
              delay={i * 110}
              className={`relative flex flex-col gap-3.5 rounded-[22px] border p-8 ${
                p.featured
                  ? "border-rm-rope bg-[linear-gradient(170deg,#34200f,#221c17_60%)] shadow-[0_30px_70px_-30px_rgba(242,112,26,.5)]"
                  : "border-rm-line-dark bg-rm-ink-3"
              }`}
            >
              {p.featured ? (
                <span className="absolute -top-[13px] right-6 rounded-full bg-rm-rope px-3 py-[5px] font-mono text-[11px] uppercase tracking-[.1em] text-rm-ink">
                  {c.recommended}
                </span>
              ) : null}
              <h3 className="font-rm-display text-2xl font-bold uppercase leading-tight">
                {p.name}
              </h3>
              <div className="font-rm-display text-[2.4rem] font-extrabold text-rm-rope-soft">
                {p.price}
                {p.per ? (
                  <small className="ml-1.5 font-rm-body text-sm font-medium text-[#bdb4a2]">
                    {p.per}
                  </small>
                ) : null}
              </div>
              <p className="text-sm text-[#bdb4a2]">{p.blurb}</p>
              <ul className="flex flex-col gap-[9px] text-[15.5px]">
                {p.features.map((f) => (
                  <li
                    key={f.text}
                    className={`flex gap-2.5 ${f.on ? "text-[#e6dccb]" : "text-[#7d7466]"}`}
                  >
                    <span
                      aria-hidden
                      className={`font-bold ${f.on ? "text-rm-rope-soft" : ""}`}
                    >
                      {f.on ? "✓" : "–"}
                    </span>
                    {f.text}
                  </li>
                ))}
              </ul>
              {p.available ? (
                <a
                  href={BUY_HREF}
                  className={`${p.featured ? btnMain : btnLight} mt-auto`}
                >
                  {p.cta}
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="mt-auto inline-flex cursor-not-allowed items-center justify-center rounded-full border-[1.5px] border-white/20 px-[26px] py-3.5 text-base font-bold text-[#bdb4a2]"
                >
                  {p.cta}
                </span>
              )}
            </Reveal>
          ))}
        </div>

        <p className="mt-[22px] text-center text-[15px] text-[#bdb4a2]">
          {c.moreLead}{" "}
          <a
            href={localeHref(locale, "/productos/ropemaster/licencias")}
            className="underline underline-offset-2 hover:text-white"
          >
            {c.moreLink}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
