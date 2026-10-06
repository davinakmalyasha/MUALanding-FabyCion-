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
  // Canonical WhatsApp glyph (Simple Icons, 24x24). An earlier hand-rolled
  // version rendered with a dented handset and read as broken at small sizes.
  whatsapp:
    "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
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
