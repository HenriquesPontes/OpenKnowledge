import { Container } from "@/components/ui/Container";
import { footer } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-16 sm:mt-32 lg:mt-48">
      <Container>
        <div className="border-t border-border pt-6 pb-10">
          <p className="text-muted text-base tracking-[-0.01em]">
            {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
