"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** e.g. "100%", "0 MXN", "6 pasos" — only the leading digits animate. */
  value: string;
  duration?: number;
  className?: string;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function CountUp({ value, duration = 1100, className }: CountUpProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(target === null ? value : "0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            if (reduceMotion) {
              setDisplay(String(target));
              return;
            }
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = easeOutCubic(progress);
              setDisplay(String(Math.round(eased * target)));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}