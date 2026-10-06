"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import { portfolio, portfolioCategories } from "@/content/portfolio";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";
import type { PortfolioCategory } from "@/types";

type Filter = PortfolioCategory | "all";

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === "all"
        ? portfolio
        : portfolio.filter((image) => image.category === filter),
    [filter],
  );

  // Stepping always walks the full set, so paging stays consistent.
  const step = (direction: -1 | 1) => {
    setOpenIndex((current) =>
      current === null
        ? current
        : (current + direction + portfolio.length) % portfolio.length,
    );
  };

  return (
    <Section id="portofolio" tone="light">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            eyebrow="Portofolio"
            title="Hasil karyanya, tanpa filter."
            description="Klik salah satu foto untuk melihat lebih dekat."
            className="lg:max-w-[32rem]"
          />

          <div
            role="group"
            aria-label="Filter kategori portofolio"
            className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 lg:mx-0 lg:flex-wrap lg:px-0"
          >
            {portfolioCategories.map((category) => {
              const isActive = filter === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFilter(category.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "h-10 shrink-0 rounded-full border px-4 text-[0.8rem] transition-colors duration-300",
                    isActive
                      ? "border-charcoal bg-charcoal text-ivory"
                      : "border-charcoal/20 text-muted hover:border-charcoal/50 hover:text-charcoal",
                  )}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Re-keying the grid replays the entrance animation on filter change. */}
        <div
          key={filter}
          className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
        >
          {visible.map((image, index) => (
            <m.button
              key={image.src}
              type="button"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: reduce ? 0.2 : 0.45,
                delay: reduce ? 0 : index * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setOpenIndex(portfolio.indexOf(image))}
              className="group relative block w-full cursor-zoom-in overflow-hidden bg-ivory-deep"
              aria-label={`Perbesar: ${image.alt}`}
            >
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={80}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </div>

              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/10"
              />
            </m.button>
          ))}
        </div>
      </Container>

      <Lightbox
        images={portfolio}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </Section>
  );
}
