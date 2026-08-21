"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { nav, sectionNavLink } from "@/lib/constants";

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
  const pathname = usePathname();
  const authScreen =
    pathname === "/api/login" || pathname === "/api/register";
  const apiAuth = pathname === "/api" || pathname.startsWith("/api/");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle(
      "forro-theme",
      pathname === "/app" || pathname.startsWith("/app/"),
    );
    return () => {
      root.classList.remove("forro-theme");
    };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target)) setOpen(false);
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

  if (authScreen) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled || open
          ? "bg-background/72 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <Container className="relative flex items-center justify-between gap-2 sm:gap-3 h-[60px] sm:h-[64px] pt-[env(safe-area-inset-top)]">
        <a
          href="/"
          aria-label="Forro Vivo home"
          className="group flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
        >
          <Image
            src="/images/app/forro-icon.png"
            alt=""
            width={512}
            height={512}
            priority
            quality={100}
            sizes="28px"
            className="h-7 w-7"
          />
        </a>

        <nav className="flex min-w-0 items-center gap-1.5 sm:gap-4">
          {nav.links
            .filter((link) => !apiAuth)
            .map((link) => {
              const resolved =
                link.label === "How it works" ? sectionNavLink(pathname) : link;
              return (
                <a
                  key={resolved.label}
                  href={resolved.href}
                  className="hidden sm:inline text-white hover:text-white/70 transition-colors duration-150 text-[13px] sm:text-sm tracking-[-0.01em] whitespace-nowrap rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                >
                  {resolved.label}
                </a>
              );
            })}

          <div ref={menuRef}>
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="menu"
              onClick={() => {
                setOpen((value) => !value);
              }}
              className="inline-flex shrink-0 items-center h-8 px-1.5 sm:px-0 cursor-pointer transition-colors duration-150 text-[13px] sm:text-sm tracking-[-0.01em] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 text-white hover:text-white/70"
            >
              {nav.menu.label}
            </button>
            {open ? (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-[min(40rem,100%)] rounded-2xl border border-border bg-background/95 px-4 py-4 sm:px-5 sm:py-5 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.18)] backdrop-blur-xl max-h-[min(32rem,calc(100dvh-5rem))] overflow-y-auto overscroll-contain max-sm:fixed max-sm:left-4 max-sm:right-4 max-sm:top-[calc(3.75rem+env(safe-area-inset-top))] max-sm:mt-0 max-sm:w-auto"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
                  {nav.menu.columns.map((column) => (
                    <div key={column.heading}>
                      <p className="text-muted text-[11px] tracking-[0.08em] uppercase mb-2.5">
                        {column.heading}
                      </p>
                      <ul className="space-y-1">
                        {column.items.map((item) => (
                          <li key={item.label}>
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
                                  ? "block py-1.5 text-foreground text-[15px] leading-snug tracking-[-0.02em] hover:text-muted transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                                  : "block py-1.5 text-foreground text-sm tracking-[-0.01em] hover:text-muted transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
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

          {apiAuth ? (
            <Button
              href={nav.apiAuth.loginHref}
              variant="outline"
              size="sm"
              className="shrink-0"
            >
              {nav.apiAuth.loginLabel}
            </Button>
          ) : null}

          {apiAuth ? (
            <Button
              href={nav.apiAuth.ctaHref}
              size="sm"
              className="shrink-0 max-sm:px-3"
            >
              <span className="sm:hidden">It&apos;s free</span>
              <span className="hidden sm:inline">{nav.apiAuth.cta}</span>
            </Button>
          ) : (
            <Button
              href={nav.ctaHref}
              size="sm"
              className="shrink-0 gap-1.5 whitespace-nowrap"
            >
              {nav.cta}
              <ExternalArrow />
            </Button>
          )}
        </nav>
      </Container>
    </header>
  );
}
