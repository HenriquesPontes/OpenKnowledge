import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductTree } from "@/components/sections/Architecture";
import { productOverview } from "@/lib/constants";
import { APP_STORE_URL } from "@/lib/catalog";

export const metadata = {
  title: "Overview",
};

export default function OverviewPage() {
  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          {productOverview.eyebrow}
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          {productOverview.title}
        </h1>
        <p className="mt-4 max-w-[640px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          {productOverview.description}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button href={APP_STORE_URL} className="w-full sm:w-auto">
            Try Forro Vivo
          </Button>
          <Button href="/#waitlist" variant="outline" className="w-full sm:w-auto">
            Join waitlist
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {productOverview.products.map((product) => (
            <a
              key={product.href}
              href={product.href}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-[#454545] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
            >
              <h2 className="text-white/90 font-heading text-lg tracking-[-0.02em]">
                {product.label}
              </h2>
              <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
                {product.description}
              </p>
            </a>
          ))}
        </div>
      </Container>

      <Container>
        <div className="mt-16 sm:mt-20">
          <ProductTree />
        </div>
      </Container>
    </section>
  );
}
