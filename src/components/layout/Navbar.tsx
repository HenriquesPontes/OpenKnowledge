"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { nav } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-[#141414]/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between gap-3 h-[60px] sm:h-[68px]">
        <a href="/" aria-label="ForroVivo home" className="shrink-0">
          <Image
            src="/images/logo-icon.png"
            alt="ForroVivo"
            width={28}
            height={28}
            className="w-7 h-7"
          />
        </a>

        <nav className="flex min-w-0 items-center gap-2 sm:gap-4">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hidden sm:inline text-muted hover:text-white transition-colors text-sm sm:text-base tracking-[-0.01em] whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}

          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="menu"
              onClick={() => setOpen((value) => !value)}
              className={`transition-colors text-sm sm:text-base tracking-[-0.01em] ${
                open ? "text-white" : "text-muted hover:text-white"
              }`}
            >
              {nav.menu.label}
            </button>
            {open ? (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-border bg-[#141414] px-4 py-4 sm:px-5 sm:py-5 shadow-[0px_16px_32px_-12px_rgba(0,0,0,0.45)] max-sm:fixed max-sm:left-4 max-sm:right-4 max-sm:top-[3.75rem] max-sm:mt-0 max-sm:w-auto"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
                  {nav.menu.columns.map((column) => (
                    <div key={column.heading}>
                      <p className="text-muted text-xs tracking-[-0.01em] mb-2">
                        {column.heading}
                      </p>
                      <ul className="space-y-1">
                        {column.items.map((item) => (
                          <li key={item.href}>
                            <a
                              href={item.href}
                              role="menuitem"
                              onClick={() => setOpen(false)}
                              className={
                                column.size === "large"
                                  ? "block py-1 text-white text-base leading-snug tracking-[-0.02em] hover:text-white/70 transition-colors"
                                  : "block py-1 text-white text-sm tracking-[-0.01em] hover:text-white/70 transition-colors"
                              }
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <Button href={nav.ctaHref} size="sm" className="shrink-0">
            {nav.cta}
          </Button>
        </nav>
      </Container>
    </header>
  );
}
