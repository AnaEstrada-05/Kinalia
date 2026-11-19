import Image from "next/image";
import type { Copy } from "./copy";
import { Eyebrow, btnGhost, btnMain, h2Class, localeHref, wrap } from "./ui";

// Cierre con CTA sobre la foto de licencias, y pie de pagina.
export default function Closing({
  c,
  footer,
  locale,
}: {
  c: Copy["closing"];
  footer: Copy["footer"];
  locale: string;
}) {
  return (
    <>
      <section className="relative overflow-hidden py-[110px] text-center text-white">
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/rope-master/licencias.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,8,.8),rgba(10,9,8,.9))]" />
        </div>
        <div className={`${wrap} relative flex flex-col items-center gap-6`}>
          <Eyebrow className="!text-rm-rope-soft">{c.eyebrow}</Eyebrow>
          <h2 className={`${h2Class} max-w-[18ch]`}>{c.title}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#licencias" className={btnMain}>
              {c.primary}
            </a>
            <a href={`mailto:${c.email}`} className={btnGhost}>
              {c.secondary}
            </a>
          </div>
          <small className="font-mono text-[#e6dccb]">{c.email}</small>
        </div>
      </section>

      <footer className="bg-rm-ink pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-14 text-[15px] text-[#c9bfae]">
        <div className={wrap}>
          <div className="grid grid-cols-2 gap-[30px] min-[761px]:grid-cols-[1.4fr_repeat(3,1fr)]">
            <div className="col-span-2 flex flex-col gap-1.5 min-[761px]:col-span-1">
              <span className="mb-2 inline-block self-start rounded-xl bg-rm-sand px-3 py-1.5">
                <Image
                  src="/assets/ropemaster-logo.png"
                  alt="Rope Master"
                  width={140}
                  height={70}
                  className="h-[62px] w-auto"
                />
              </span>
              <span className="max-w-xs">{footer.tagline}</span>
            </div>
            <FooterCol
              title={footer.product}
              links={footer.productLinks}
              locale={locale}
            />
            <FooterCol
              title={footer.legal}
              links={footer.legalLinks}
              locale={locale}
            />
            <FooterCol
              title={footer.support}
              links={footer.supportLinks}
              locale={locale}
            />
          </div>
          <div className="mt-9 flex flex-wrap justify-between gap-2.5 border-t border-rm-line-dark pt-5 text-[13px]">
            <span>{footer.rights}</span>
            <a href={`/${locale}`} className="hover:text-white">
              {footer.by}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterCol({
  title,
  links,
  locale,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  locale: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <b className="mb-2.5 block font-mono text-xs font-medium uppercase tracking-[.1em] text-rm-rope-soft">
        {title}
      </b>
      {links.map((l) => (
        <a
          key={l.href + l.label}
          href={localeHref(locale, l.href)}
          className="transition-colors hover:text-white"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
