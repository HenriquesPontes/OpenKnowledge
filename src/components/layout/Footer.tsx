import { Container } from "@/components/ui/Container";
import { footer } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto">
      <Container>
        <div className="border-t border-border pt-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:pt-10 sm:pb-14">
          <p className="text-center text-white text-sm sm:text-base tracking-[-0.01em] break-words">
            {footer.companyName}
          </p>
          <p className="mt-2 text-center text-muted text-sm tracking-[-0.01em] px-2">
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
