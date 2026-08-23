"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { openCalendlyModal } from "./CalendlyModal";
import { useLanguage } from "./LanguageContext";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const riseItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", duration: 0.6, bounce: 0 } },
};
const linkStagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } };
const linkItem: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.4, bounce: 0 } },
};
const wordmarkVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", duration: 1.1, bounce: 0 } },
};

export default function Footer() {
  const { t, locale } = useLanguage();
  const columns = [t.footer.columns.productos, t.footer.columns.empresa];

  return (
    <footer id="contacto" className="w-full overflow-hidden rounded-t-4xl bg-forest font-sans antialiased sm:rounded-t-[2.5rem] md:rounded-t-[3rem]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="px-6 pt-14 pb-0 sm:px-8 sm:pt-16 lg:px-14 lg:pt-20 xl:px-20 md:px-14"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-10 lg:flex-row lg:gap-16">
          <motion.div variants={riseItem} className="flex shrink-0 flex-col gap-5 lg:max-w-[280px]">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/40 font-display text-sm text-cream">
                K
              </span>
              <span className="text-lg font-medium text-cream uppercase select-none">Kinalia</span>
            </div>

            <p className="text-sm leading-[1.6] font-light text-pretty text-cream/60">
              {t.footer.tagline}
            </p>

            <motion.button
              type="button"
              onClick={openCalendlyModal}
              variants={riseItem}
              whileTap={{ scale: 0.96 }}
              className="group mt-1 inline-flex w-fit items-center gap-2.5 rounded-full bg-terracotta py-0.5 pr-1 pl-5 shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-[background-color,box-shadow] duration-200 hover:bg-terracotta-dark hover:shadow-[0_2px_8px_rgba(0,0,0,0.25),0_0_20px_rgba(0,87,255,0.25)]"
            >
              <span className="text-sm font-medium text-cream">{t.footer.cta}</span>
              <span className="flex size-9 items-center justify-center rounded-full bg-cream/15">
                <ArrowRight className="size-4 text-cream transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </motion.button>
          </motion.div>

          <nav aria-label="Footer navigation" className="grid w-full max-w-[360px] grid-cols-2 gap-y-8">
            {columns.map((col) => (
              <motion.div key={col.title} variants={riseItem}>
                <h3 className="text-md leading-none font-normal tracking-wide text-cream/90">
                  {col.title}
                </h3>
                <motion.ul variants={linkStagger} className="mt-3 flex flex-col gap-3">
                  {col.items.map((link) => (
                    <motion.li key={link.label} variants={linkItem}>
                      <a
                        href={
                          link.href.startsWith("#")
                            ? link.href
                            : `/${locale}${link.href}`
                        }
                        className="inline-block text-sm leading-none font-light text-cream/55 transition-colors duration-200 hover:text-cream"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.div>

      <div className="border-t border-cream/10 px-6 py-6 text-cream/50 sm:px-8 lg:px-14 xl:px-20 margin-top-20 mt-[4vw] md:px-14">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-2 text-center text-xs sm:flex-row sm:justify-between sm:text-left">
          <a href="mailto:contacto@kinalia.com.mx" className="transition-colors hover:text-cream">
            contacto@kinalia.com.mx
          </a>
          <span>© {new Date().getFullYear()} {t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}