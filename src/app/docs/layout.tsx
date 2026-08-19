import { Container } from "@/components/ui/Container";
import { docsNav } from "@/lib/constants";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex-1 pt-28 pb-20 sm:pt-36">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <aside>
          <p className="text-muted text-sm tracking-[-0.01em] mb-6">
            Documentation
          </p>
          <nav className="space-y-8">
            {docsNav.map((group) => (
              <div key={group.heading}>
                <p className="text-white text-sm tracking-[0.08em] uppercase mb-3">
                  {group.heading}
                </p>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <a
                        href={link.href}
                        className="text-muted hover:text-white transition-colors text-base tracking-[-0.01em]"
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
        <div>{children}</div>
      </Container>
    </section>
  );
}
