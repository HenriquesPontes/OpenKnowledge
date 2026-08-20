import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { productOverview } from "@/lib/constants";

export const metadata = {
  title: "Overview",
  description: productOverview.description,
};

function Collage() {
  const top = productOverview.collage.slice(0, 4);
  const bottom = productOverview.collage.slice(4);

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:hidden">
        {productOverview.collage.map((tile) => (
          <div
            key={`${tile.src}-${tile.alt}`}
            className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem]"
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              priority
              className="object-cover"
              sizes="50vw"
            />
          </div>
        ))}
      </div>
      <div className="hidden md:block space-y-3 lg:space-y-4">
        {[top, bottom].map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-3 lg:gap-4">
            {row.map((tile) => (
              <div
                key={`${tile.src}-${tile.grow}`}
                className="relative min-w-0 overflow-hidden rounded-[2rem]"
                style={{
                  flexGrow: tile.grow,
                  flexBasis: 0,
                  height: rowIndex === 0 ? "11.5rem" : "13.5rem",
                }}
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  priority={rowIndex === 0}
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default function OverviewPage() {
  const { statement } = productOverview;

  return (
    <div className="flex flex-1 flex-col bg-background">
      <section className="pt-[4.75rem] sm:pt-[5.25rem]">
        <Container className="max-w-[90rem]">
          <Collage />
          <p className="mt-4 text-muted text-sm tracking-[-0.01em]">
            {productOverview.photoCredit.label}:{" "}
            <a
              href={productOverview.photoCredit.href}
              className="text-white hover:text-white/70 transition-colors"
            >
              {productOverview.photoCredit.name}
            </a>
          </p>
        </Container>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1
          className="mx-auto max-w-[44rem] text-center font-heading tracking-[-0.03em] leading-[1.25] text-muted"
          style={{ fontSize: "clamp(1.85rem, 4.8vw, 3.5rem)" }}
        >
          {statement.lines.map((line, lineIndex) => (
            <span key={line.map((part) => part.text).join("")}>
              {lineIndex > 0 ? <br /> : null}
              {line.map((part) => (
                <span
                  key={part.text}
                  style={"color" in part ? { color: part.color } : undefined}
                >
                  {part.text}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {productOverview.products.map((product) => (
              <a
                key={product.href}
                href={product.href}
                className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors duration-150 hover:border-[#454545] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
              >
                <h2 className="font-heading text-white text-lg tracking-[-0.02em]">
                  {product.label}
                </h2>
                <p className="mt-3 text-muted text-sm leading-6 tracking-[-0.01em]">
                  {product.description}
                </p>
              </a>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
