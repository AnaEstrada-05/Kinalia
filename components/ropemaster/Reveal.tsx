"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Variant = "up" | "left" | "right";

const CLASS: Record<Variant, string> = {
  up: "rm-reveal",
  left: "rm-reveal-left",
  right: "rm-reveal-right",
};

// Entrada al hacer scroll, igual que la de la pagina anterior de Rope Master:
// "up" sube y aparece; "left" y "right" entran de lado con una leve inclinacion.
// Los .rm-li de adentro se escalonan solos cuando el bloque se vuelve visible.
export default function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  /** Milisegundos antes de animar, para escalonar grupos. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${CLASS[variant]} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
