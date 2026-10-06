"use client";

import type { ReactNode } from "react";
import { LazyMotion, domMax } from "motion/react";

/**
 * Loads only the core animation bundle. `strict` guarantees we use `m`
 * throughout, which keeps the client bundle small.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  // domMax, not domAnimation: the inView feature lives in the layout bundle,
  // so whileInView silently no-ops (and stays at `initial`) under domAnimation.
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
