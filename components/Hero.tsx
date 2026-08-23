"use client";

import { motion, type Variants } from "framer-motion";
import CallButton from "./CallButton";
import { openCalendlyModal } from "./CalendlyModal";
import { useLanguage } from "./LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  const bgVariants: Variants = {
    hidden: { opacity: 0, scale: 1.05 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const headlineContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.3 },
    },
  };

  const lineIn: Variants = {
    hidden: { opacity: 0, y: 48, filter: "blur(16px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 26, stiffness: 72, mass: 1.4 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    show: (delay = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 26, stiffness: 110, delay },
    }),
  };

  const statsContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 1.35 },
    },
  };

  const statIn: Variants = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 22, stiffness: 100 },
    },
  };

  return (
    <div
      data-nav-theme="hero"
      className="relative min-h-screen w-full overflow-hidden antialiased"
    >
      <motion.div
        variants={bgVariants}
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute inset-0 z-0 select-none"
      >
        <img
          src="/assets/background.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[85%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,18,60,0.82) 0%, rgba(5,18,60,0.55) 38%, rgba(5,18,60,0.18) 70%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-52"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(244,244,244,0.6) 60%, #F4F4F4 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="animate-blobDrift pointer-events-none absolute -left-32 top-1/4 z-[1] h-[28rem] w-[28rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(47,209,200,0.28) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden="true"
        className="animate-blobDrift-slow pointer-events-none absolute -right-24 -top-8 z-[1] h-[32rem] w-[32rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,87,255,0.32) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* SOLO cambio: márgenes responsivos px-6 sm:px-10 md:px-14 lg:px-20 */}
      <div className="relative z-10 flex min-h-screen flex-col justify-evenly px-6 pb-12 pt-24 sm:px-10 md:px-14 lg:px-20">
        <div className="flex max-w-4xl flex-col items-start">
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="show"
          >
            <motion.span
              variants={lineIn}
              className="block font-display text-[3.2rem] leading-[1.04] font-normal tracking-[-0.03em] text-white sm:text-[4.2rem] md:text-[5rem] lg:text-[6rem]"
              style={{ textShadow: "0 2px 32px rgba(0,0,0,0.3)" }}
            >
              {t.hero.line1}
            </motion.span>
            <motion.span
              variants={lineIn}
              className="text-gradient-brand block font-display text-[3.2rem] leading-[1.04] font-normal tracking-[-0.03em] sm:text-[4.2rem] md:text-[5rem] lg:text-[6rem]"
            >
              {t.hero.line2}
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.9}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-[38ch] text-[15px] leading-[1.72] text-white sm:text-[16px]"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={1.15}
            initial="hidden"
            animate="show"
            className="mt-9"
          >
            <CallButton
              onClick={openCalendlyModal}
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[14.5px] font-medium text-neutral-900 shadow-[0_2px_20px_rgba(0,0,0,0.22)] transition-all duration-150 hover:shadow-[0_4px_28px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.97]"
            >
              {t.hero.cta}
            </CallButton>
          </motion.div>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            variants={statsContainer}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3"
          >
            {t.hero.badges.map((stat) => (
              <motion.div
                key={stat.label}
                variants={statIn}
                className="flex flex-col gap-0.5 rounded-2xl border border-white/20 bg-black/30 px-6 py-4 backdrop-blur-md"
              >
                <span className="text-[13px] font-semibold tracking-tight text-white">
                  {stat.label}
                </span>
                <span className="text-[11px] text-white/80">{stat.sub}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={1.6}
            initial="hidden"
            animate="show"
            className="max-w-[28ch] text-[13px] leading-[1.6] text-white sm:text-right"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5), 0 4px 18px rgba(0,0,0,0.4)" }}
          >
            {t.hero.tagline}
          </motion.p>
        </div>
      </div>
    </div>
  );
}