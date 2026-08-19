import { Container } from "@/components/ui/Container";
import { footer } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-16 sm:mt-32 lg:mt-48">
      <Container>
        <div className="border-t border-border pt-6 pb-10">
          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {footer.links.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="text-muted hover:text-white transition-colors text-base tracking-[-0.01em]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="mt-6 text-muted text-base tracking-[-0.01em]">
            {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
