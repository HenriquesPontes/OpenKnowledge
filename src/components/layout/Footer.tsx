import { Container } from "@/components/ui/Container";
import { footer } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      <Container>
        <div className="border-t border-white/8 pt-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:pt-10 sm:pb-14">
          <p className="text-center text-white/90 text-sm tracking-[-0.01em] break-words">
            {footer.companyName}
          </p>
          <p className="mt-2 text-center text-muted text-[13px] tracking-[-0.01em] px-2 leading-5">
            {footer.registration}. Company number {footer.companyNumber}.
          </p>
          <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted hover:text-white transition-colors duration-150 text-[13px] tracking-[-0.01em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="mt-6 text-center text-muted/80 text-[12px] tracking-[-0.01em]">
            © {year} {footer.companyName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
