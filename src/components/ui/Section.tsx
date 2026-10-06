import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  tone?: "light" | "deep" | "dark";
  className?: string;
  children: ReactNode;
}

const tones = {
  light: "bg-ivory text-charcoal",
  deep: "bg-ivory-deep text-charcoal",
  dark: "bg-charcoal text-ivory",
} as const;

export function Section({ id, tone = "light", className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-[8.5rem]", tones[tone], className)}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="flex items-center gap-3 text-[0.7rem] font-medium tracking-[0.22em] uppercase">
        <span className={tone === "dark" ? "text-champagne-soft" : "text-gold"}>
          {index}
        </span>
        <span
          aria-hidden
          className={cn(
            "h-px w-9",
            tone === "dark" ? "bg-champagne-soft/45" : "bg-champagne/60",
          )}
        />
        <span className={tone === "dark" ? "text-ivory/70" : "text-muted"}>{eyebrow}</span>
      </p>

      <h2
        className={cn(
          "font-display text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.08] font-normal tracking-[-0.01em] text-balance",
          tone === "dark" ? "text-ivory" : "text-charcoal",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "max-w-[52ch] text-[0.975rem] leading-relaxed",
            tone === "dark" ? "text-ivory/70" : "text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
