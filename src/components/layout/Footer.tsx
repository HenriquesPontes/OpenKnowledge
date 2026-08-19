import { Container } from "@/components/ui/Container";
import { footer } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-16 sm:mt-24 lg:mt-32">
      <Container>
        <div className="border-t border-border pt-8 pb-10 sm:pt-10 sm:pb-14">
          <p className="text-center text-white text-sm sm:text-base tracking-[-0.01em]">
            {footer.companyName}
          </p>
          <p className="mt-2 text-center text-muted text-sm tracking-[-0.01em]">
            {footer.registration}. Company number {footer.companyNumber}.
          </p>
          <nav className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted hover:text-white transition-colors text-sm tracking-[-0.01em]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
