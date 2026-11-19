import type { Copy } from "./copy";
import { SectionHead, wrap } from "./ui";

// Preguntas que frenan una compra. <details> nativo: accesible y sin JS. Todas
// comparten `name`, asi que al abrir una el navegador cierra la que estaba abierta.
export default function Faq({ c }: { c: Copy["faq"] }) {
  return (
    <section id="preguntas" className="scroll-mt-16 py-20 sm:py-[100px]">
      <div className={wrap}>
        <SectionHead eyebrow={c.eyebrow} title={c.title} />
        <div className="mx-auto flex max-w-[820px] flex-col">
          {c.items.map((item, i) => (
            <details
              key={item.q}
              name="rm-faq"
              open={i === 0}
              className="group border-b border-rm-line py-1"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-[18px] text-[1.08rem] font-bold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="text-2xl font-normal leading-none text-rm-rope transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[64ch] pb-5 text-rm-dim">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
