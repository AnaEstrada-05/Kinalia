"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";

const OPEN_EVENT = "kinalia:open-calendly";

export function openCalendlyModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_EVENT));
  }
}

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/emilianoneaves-kinalia/30min";

export default function CalendlyModal() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={t.calendly.title}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={close}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm cursor-default"
      />

      {/* Panel */}
      <div className="relative z-10 flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="eyebrow">{t.calendly.eyebrow}</p>
            <h2 className="font-display text-lg text-ink">
              {t.calendly.heading}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label={t.calendly.closeAria}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-terracotta hover:text-terracotta"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1L15 15M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1">
          <iframe
            title={t.calendly.title}
            src={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=fdfcf8&text_color=211d17&primary_color=c1603c`}
            className="h-full w-full"
            frameBorder={0}
          />
        </div>
      </div>
    </div>
  );
}