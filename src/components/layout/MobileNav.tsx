"use client";

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/lib/contact";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import type { NavLink } from "@/types";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  /** The control that opened the panel, so focus can be returned to it. */
  openerRef: RefObject<HTMLButtonElement | null>;
}

export function MobileNav({ open, onClose, links, openerRef }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
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
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      return;
    }
    // Restore focus only on a genuine close, never on first mount. Otherwise
    // the burger would grab focus as soon as the page loads.
    if (wasOpen.current) {
      wasOpen.current = false;
      openerRef.current?.focus();
    }
  }, [open, openerRef]);

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        // Stays mounted for the slide transition, so keep it out of the
        // accessibility tree and unfocusable while it is closed.
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col",
          "bg-ivory transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-[4.5rem] items-center justify-between border-b border-charcoal/10 px-6">
          <span className="font-display text-base tracking-[0.2em] uppercase">
            {site.brandLine}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="-mr-2 grid h-10 w-10 place-items-center rounded-full text-charcoal transition-colors hover:bg-charcoal/5"
          >
            <span className="h-4 w-4">
              <Icon name="close" />
            </span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-8">
          <ul className="flex flex-col">
            {links.map((link, index) => (
              <li key={link.href} className="border-b border-charcoal/10">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-baseline gap-4 py-4 text-charcoal transition-colors hover:text-gold"
                >
                  <span className="text-[0.65rem] tracking-[0.2em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-charcoal/10 p-6">
          <Button href={whatsappUrl()} external size="md" className="w-full">
            Booking via WhatsApp
          </Button>
          <p className="mt-4 text-center text-sm text-muted">
            {site.contact.phoneDisplay}
          </p>
        </div>
      </div>
    </>
  );
}
