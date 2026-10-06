"use client";

import { useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { faqs } from "@/content/faq";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section id="faq" tone="deep">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              index="05"
              eyebrow="FAQ"
              title="Pertanyaan yang sering masuk."
              description="Kalau belum ketemu jawabannya, tanya langsung lewat WhatsApp."
            />
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-charcoal/15">
              {faqs.map((faq, index) => {
                const isOpen = open === index;
                const triggerId = `faq-trigger-${index}`;
                const panelId = `faq-panel-${index}`;

                return (
                  <Reveal key={faq.question} delay={index * 0.04}>
                    <div className="border-b border-charcoal/15">
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : index)}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          id={triggerId}
                          className="flex w-full items-start justify-between gap-6 py-6 text-left"
                        >
                          <span
                            className={cn(
                              "font-display text-[1.15rem] leading-snug transition-colors md:text-[1.3rem]",
                              isOpen ? "text-gold" : "text-charcoal",
                            )}
                          >
                            {faq.question}
                          </span>

                          <span
                            aria-hidden
                            className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-charcoal/20 text-charcoal"
                          >
                            <span className="relative h-3 w-3">
                              <Icon
                                name={isOpen ? "minus" : "plus"}
                                className="absolute inset-0"
                              />
                            </span>
                          </span>
                        </button>
                      </h3>

                      <m.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{
                          duration: reduce ? 0 : 0.32,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[62ch] pr-10 pb-7 text-[0.95rem] leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </m.div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
