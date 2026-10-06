"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/content/site";
import { whatsappUrl } from "@/lib/contact";
import { HEADER_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  const ids = useMemo(
    () => site.navLinks.map((link) => link.href.replace("#", "")),
    [],
  );
  const active = useScrollSpy(ids, !isMobile);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        style={{ height: HEADER_HEIGHT }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
          scrolled
            ? "border-b border-charcoal/10 bg-ivory/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-full items-center justify-between gap-6">
          <a
            href="#top"
            className="font-display text-[0.95rem] leading-none tracking-[0.24em] uppercase transition-opacity hover:opacity-70"
          >
            {site.brandLine}
          </a>

          <nav aria-label="Navigasi utama" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {site.navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative py-1 text-[0.85rem] tracking-[0.04em] transition-colors",
                        isActive ? "text-charcoal" : "text-muted hover:text-charcoal",
                      )}
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-champagne transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Wrapped because Button always sets `inline-flex`, which would
                otherwise win over a `hidden` utility on the same element. */}
            <span className="hidden sm:inline-flex">
              <Button href={whatsappUrl()} external size="sm" variant="primary">
                Booking
              </Button>
            </span>

            <button
              ref={burgerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="-mr-2 grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-charcoal/5 lg:hidden"
            >
              <span className="h-4 w-4">
                <Icon name="menu" />
              </span>
            </button>
          </div>
        </Container>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={site.navLinks}
        openerRef={burgerRef}
      />
    </>
  );
}
