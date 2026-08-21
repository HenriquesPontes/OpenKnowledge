"use client";

import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import {
  appDocsNav,
  connectDocsNav,
  openKnowledgeDocsNav,
} from "@/lib/constants";

function DocsSidebar({
  title,
  nav,
}: {
  title: string;
  nav: typeof openKnowledgeDocsNav;
}) {
  return (
    <aside>
      <a
        href="/docs"
        className="mb-3 inline-block text-muted hover:text-white transition-colors text-sm tracking-[-0.01em] lg:mb-6"
      >
        ← All products
      </a>
      <p className="text-white text-sm tracking-[-0.01em] mb-3 lg:mb-6">
        {title}
      </p>
      <nav className="flex gap-x-5 gap-y-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 lg:block lg:space-y-8 lg:overflow-visible lg:pb-0">
        {nav.map((group) => (
          <div key={group.heading} className="shrink-0 lg:shrink">
            <p className="text-muted text-xs sm:text-sm tracking-[0.08em] uppercase mb-2 lg:mb-3">
              {group.heading}
            </p>
            <ul className="flex gap-x-4 lg:block lg:space-y-2">
              {group.links.map((link) => (
                <li key={link.href + link.label}>
                  <a
                    href={link.href}
                    className="whitespace-nowrap text-muted hover:text-white transition-colors duration-150 text-sm tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHub = pathname === "/docs";

  if (isHub) {
    return <Container className="max-w-[90rem]">{children}</Container>;
  }

  const isApp = pathname === "/docs/app" || pathname.startsWith("/docs/app/");
  const isConnect =
    pathname === "/docs/connect" || pathname.startsWith("/docs/connect/");

  const title = isApp
    ? "Forro Vivo App"
    : isConnect
      ? "Forro Connect"
      : "Open Knowledge";
  const nav = (
    isApp ? appDocsNav : isConnect ? connectDocsNav : openKnowledgeDocsNav
  ) as typeof openKnowledgeDocsNav;

  return (
    <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
      <DocsSidebar title={title} nav={nav} />
      <div className="min-w-0">{children}</div>
    </Container>
  );
}
