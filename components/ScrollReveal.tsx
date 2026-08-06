"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  /** Visual entrance style. Defaults to "up". */
  variant?: Variant;
  /** Delay in ms before the reveal animates in, for staggered groups. */
  delay?: number;
};

const VARIANT_CLASS: Record<Variant, string> = {
  up: "reveal-up",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

export default function ScrollReveal({
  children,
  className = "",
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.15,
  variant = "up",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={`reveal-block ${VARIANT_CLASS[variant]} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}