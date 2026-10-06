"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import type { PortfolioImage } from "@/types";
import { Icon } from "./Icon";

interface LightboxProps {
  images: PortfolioImage[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const open = index !== null;

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, onPrev, onNext]);

  const trapFocus = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== "Tab" || !panelRef.current) return;

    const focusables = panelRef.current.querySelectorAll<HTMLElement>("button");
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }, []);

  const current = index === null ? null : images[index];
  const position = index === null ? 0 : index + 1;

  return (
    <AnimatePresence>
      {open && current ? (
        <m.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          className="fixed inset-0 z-60 bg-charcoal/95 backdrop-blur-sm"
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Portofolio ${position} dari ${images.length}`}
            tabIndex={-1}
            onKeyDown={trapFocus}
            className="flex h-full flex-col outline-none"
          >
            <div className="flex shrink-0 items-center justify-between px-5 py-4 md:px-8">
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-ivory/60">
                {position} / {images.length}
              </p>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup tampilan"
                className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-ivory transition-colors hover:bg-ivory/10"
              >
                <span className="h-5 w-5">
                  <Icon name="close" />
                </span>
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-20">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Foto sebelumnya"
                className="absolute left-2 z-10 grid h-12 w-12 place-items-center rounded-full text-ivory transition-colors hover:bg-ivory/10 md:left-6"
              >
                <span className="h-5 w-5 -scale-x-100">
                  <Icon name="arrow-right" />
                </span>
              </button>

              <figure className="relative flex h-full max-h-full w-full max-w-3xl flex-col items-center">
                <div className="relative min-h-0 w-full flex-1">
                  <Image
                    key={current.src}
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="(min-width: 768px) 60vw, 92vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </figure>

              <button
                type="button"
                onClick={onNext}
                aria-label="Foto berikutnya"
                className="absolute right-2 z-10 grid h-12 w-12 place-items-center rounded-full text-ivory transition-colors hover:bg-ivory/10 md:right-6"
              >
                <span className="h-5 w-5">
                  <Icon name="arrow-right" />
                </span>
              </button>
            </div>

            <p className="shrink-0 px-6 pb-6 text-center text-xs leading-relaxed text-ivory/55 md:px-16">
              {current.alt}
            </p>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
