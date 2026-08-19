"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { nav } from "@/lib/constants";

function ExternalArrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L8.5 3.5M8.5 3.5H4.5M8.5 3.5V7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target)) setOpen(false);
      if (!loginRef.current?.contains(target)) setLoginOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setLoginOpen(false);
      }
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
        scrolled || open || loginOpen
          ? "bg-[#141414]/80 backdrop-blur-md"
          : "bg-transparent"
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

        <nav className="relative flex min-w-0 items-center gap-2 sm:gap-4">
          {nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hidden sm:inline text-muted hover:text-white transition-colors text-sm sm:text-base tracking-[-0.01em] whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}

          <div ref={menuRef}>
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="menu"
              onClick={() => {
                setOpen((value) => !value);
                setLoginOpen(false);
              }}
              className={`transition-colors text-sm sm:text-base tracking-[-0.01em] ${
                open ? "text-white" : "text-muted hover:text-white"
              }`}
            >
              {nav.menu.label}
            </button>
            {open ? (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-[min(40rem,calc(100vw-2rem))] rounded-xl border border-border bg-[#141414] px-4 py-4 sm:px-5 sm:py-5 shadow-[0px_16px_32px_-12px_rgba(0,0,0,0.45)] max-sm:fixed max-sm:left-4 max-sm:right-4 max-sm:top-[3.75rem] max-sm:mt-0 max-sm:w-auto"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
                  {nav.menu.columns.map((column) => (
                    <div key={column.heading}>
                      <p className="text-muted text-xs tracking-[-0.01em] mb-2">
                        {column.heading}
                      </p>
                      <ul className="space-y-1">
                        {column.items.map((item) => (
                          <li key={item.label}>
                            {"href" in item && item.href ? (
                              <a
                                href={item.href}
                                role="menuitem"
                                target={
                                  "external" in item && item.external
                                    ? "_blank"
                                    : undefined
                                }
                                rel={
                                  "external" in item && item.external
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                                onClick={() => setOpen(false)}
                                className={
                                  column.size === "large"
                                    ? "block py-1 text-white text-base leading-snug tracking-[-0.02em] hover:text-white/70 transition-colors"
                                    : "block py-1 text-white text-sm tracking-[-0.01em] hover:text-white/70 transition-colors"
                                }
                              >
                                {item.label}
                              </a>
                            ) : (
                              <span
                                className={
                                  column.size === "large"
                                    ? "block py-1 text-white/60 text-base leading-snug tracking-[-0.02em]"
                                    : "block py-1 text-white/60 text-sm tracking-[-0.01em]"
                                }
                              >
                                {item.label}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div ref={loginRef} className="relative">
            <Button
              type="button"
              variant="outline"
              size="sm"
              aria-expanded={loginOpen}
              aria-haspopup="menu"
              onClick={() => {
                setLoginOpen((value) => !value);
                setOpen(false);
              }}
              className="shrink-0 gap-1.5"
            >
              {nav.login.label}
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                aria-hidden="true"
                className={`transition-transform ${loginOpen ? "rotate-180" : ""}`}
              >
                <path
                  d="M1 1l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            {loginOpen ? (
              <div
                role="menu"
                className="absolute right-0 mt-2 min-w-[11rem] rounded-xl border border-border bg-[#1a1a1a] px-3 py-2 shadow-[0px_16px_32px_-12px_rgba(0,0,0,0.45)]"
              >
                <ul className="space-y-0.5">
                  {nav.login.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        role="menuitem"
                        target={item.external ? "_blank" : undefined}
                        rel={
                          item.external ? "noopener noreferrer" : undefined
                        }
                        onClick={() => setLoginOpen(false)}
                        className="block rounded-lg px-2 py-1.5 text-white text-sm tracking-[-0.01em] hover:bg-white/5"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          <Button href={nav.ctaHref} size="sm" className="shrink-0 gap-1.5">
            {nav.cta}
            <ExternalArrow />
          </Button>
        </nav>
      </Container>
    </header>
  );
}
