import Reveal from "./Reveal";
import type { Copy } from "./copy";
import { SectionHead, wrap } from "./ui";

// No se inventan testimonios: la seccion solo aparece cuando `items` en
// copy.ts tiene testimonios reales de organizadores.
export default function Testimonials({ c }: { c: Copy["testimonials"] }) {
  if (c.items.length === 0) return null;

  return (
    <section id="clientes" className="py-20 sm:py-[100px]">
      <div className={wrap}>
        <SectionHead eyebrow={c.eyebrow} title={c.title} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-[18px]">
          {c.items.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="flex h-full flex-col gap-3.5 rounded-[18px] border border-rm-line bg-[#fbf8f1] p-[26px]">
                <blockquote>{t.quote}</blockquote>
                <figcaption className="mt-auto font-mono text-xs text-rm-dim">
                  <b className="font-medium text-rm-ink">{t.name}</b>
                  {t.role ? `, ${t.role}` : ""}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
