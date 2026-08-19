import { Container } from "@/components/ui/Container";
import { docsNav } from "@/lib/constants";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex-1 pt-24 pb-20 sm:pt-28 lg:pt-36">
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <aside>
          <p className="text-muted text-sm tracking-[-0.01em] mb-3 lg:mb-6">
            Documentation
          </p>
          <nav className="flex gap-x-5 gap-y-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 lg:block lg:space-y-8 lg:overflow-visible lg:pb-0">
            {docsNav.map((group) => (
              <div key={group.heading} className="shrink-0 lg:shrink">
                <p className="text-white text-xs sm:text-sm tracking-[0.08em] uppercase mb-2 lg:mb-3">
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
        <div className="min-w-0">{children}</div>
      </Container>
    </section>
  );
}
