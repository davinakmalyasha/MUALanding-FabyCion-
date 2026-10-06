"use client";

import { useEffect, useState } from "react";
import { HEADER_HEIGHT } from "@/lib/constants";

/**
 * Returns the id of the section currently nearest the top of the viewport.
 * Used to underline the active item in the header nav.
 */
export function useScrollSpy(ids: string[], enabled = true): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (!enabled) return;

    const onScroll = () => {
      const line = HEADER_HEIGHT + 24;
      let current = "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }

      // Pin the last section once the page is scrolled to the bottom.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      if (atBottom) current = ids[ids.length - 1] ?? current;

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, enabled]);

  return active;
}
