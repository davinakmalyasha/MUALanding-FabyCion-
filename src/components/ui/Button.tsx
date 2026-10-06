import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "accent" | "outline" | "outlineDark";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps extends CommonProps {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
}

interface NativeButtonProps extends CommonProps {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "border border-charcoal bg-charcoal text-ivory hover:border-charcoal-soft hover:bg-charcoal-soft",
  accent:
    "border border-champagne bg-champagne text-charcoal hover:border-champagne-soft hover:bg-champagne-soft",
  outline:
    "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  outlineDark:
    "border border-ivory/25 text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal",
};

const sizes: Record<Size, string> = {
  sm: "h-9 gap-1.5 px-4 text-[0.8rem]",
  md: "h-11 gap-2 px-6 text-[0.875rem]",
  lg: "h-[3.25rem] gap-2.5 px-8 text-[0.9rem]",
};

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", icon, className, children } = props;

  const base = cn(
    "inline-flex items-center justify-center rounded-full font-medium tracking-[0.02em] whitespace-nowrap",
    "transition-colors duration-300",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="relative h-3.5 w-3.5 shrink-0">
          <Icon name={icon} />
        </span>
      ) : null}
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link
        href={props.href}
        className={base}
        {...(props.external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={base}
      aria-label={props["aria-label"]}
      aria-expanded={props["aria-expanded"]}
      aria-controls={props["aria-controls"]}
    >
      {content}
    </button>
  );
}
