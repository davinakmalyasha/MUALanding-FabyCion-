import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

/** Stroke-based interface icons, all drawn on a 24x24 grid. */
const strokes = {
  "arrow-right": "M4 12h15m-6-6 6 6-6 6",
  "arrow-down": "M12 4v15m-6-6 6 6 6-6",
  "arrow-up-right": "M7 17 17 7M8.5 7H17v8.5",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  chevron: "M6 9.5l6 6 6-6",
  minus: "M6 12h12",
  plus: "M12 6v12M6 12h12",
  download: "M12 4v11m-4-4 4 4 4-4M5 20h14",
  phone:
    "M6.5 3.5h3l1.5 4-2 1.5a11.5 11.5 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.7 1.5C11.6 17.4 6.6 12.4 5 5.2A1.5 1.5 0 0 1 6.5 3.5Z",
  mail: "M3.5 6.5h17v11h-17zM3.5 7l8.5 6 8.5-6",
  check: "M5 12.5 10 17.5 19 7",
  quote:
    "M9.5 6.5C7 7.6 5.5 9.8 5.5 12.6v4.9h5.2v-5.2H8.4c0-1.7.7-2.9 2.2-3.7l-1.1-2.1Zm9 0C16 7.6 14.5 9.8 14.5 12.6v4.9h5.2v-5.2h-2.3c0-1.7.7-2.9 2.2-3.7l-1.1-2.1Z",
  pin: "M12 21s6.5-6.1 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 14.9 12 21 12 21Z",
} as const;

/** Brand marks, filled rather than stroked. */
const brands = {
  whatsapp:
    "M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.1-.7.1s-.8 1-.9 1.2c-.2.2-.4.2-.7.1-1.2-.5-2.4-1.4-3.2-2.7-.6-.8-1-1.7-1.1-2-.1-.3 0-.5.1-.6l.5-.6c.1-.1.2-.3.3-.5s0-.4 0-.5L9 5.8c-.6-1.5-.9-1.4-1.1-1.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4M12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.7-.2-.4a9.9 9.9 0 1 1 8.3 4.7M20.5 3.5A11.8 11.8 0 0 0 12 0C5.5 0 .2 5.3.2 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.7a11.8 11.8 0 0 0 5.7 1.5c6.5 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.1-3.4-8.4",
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.1 1.2 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.6.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2a3.7 3.7 0 0 1-.9 1.4c-.4.4-.8.6-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4a3.7 3.7 0 0 1-1.4-.9 3.7 3.7 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.6 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.6-.1 4.9-.1m0 3.7A6.1 6.1 0 1 0 18.1 12 6.1 6.1 0 0 0 12 5.9m0 10.1A4 4 0 1 1 16 12a4 4 0 0 1-4 4m6.4-10.3a1.4 1.4 0 1 1-1.4-1.4 1.4 1.4 0 0 1 1.4 1.4",
} as const;

const brandNames = new Set<string>(Object.keys(brands));

export type IconName = keyof typeof strokes | keyof typeof brands;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
}

export function Icon({ name, className, ...props }: IconProps) {
  const isBrand = brandNames.has(name);

  if (isBrand) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        focusable="false"
        fill="currentColor"
        className={cn("h-full w-full", className)}
        {...props}
      >
        <path d={brands[name as keyof typeof brands]} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-full w-full", className)}
      {...props}
    >
      <path d={strokes[name as keyof typeof strokes]} />
    </svg>
  );
}
