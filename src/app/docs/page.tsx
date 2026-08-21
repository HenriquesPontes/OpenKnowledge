import { docsProducts } from "@/lib/constants";

export const metadata = {
  title: "Documentation",
  description: docsProducts.description,
  alternates: { canonical: "/docs" },
};

function ProductIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M5 8h18M5 14h18M5 20h12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect
          x="7"
          y="4"
          width="14"
          height="20"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M11 8h6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="10" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M7 20c1.2-2 2.8-3 5-3s3.8 1 5 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DocsIndexPage() {
  return (
    <div className="mx-auto max-w-[72rem]">
      <div className="text-center">
        <h1
          className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
        >
          {docsProducts.title}
        </h1>
        <p className="mx-auto mt-4 max-w-[40rem] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          {docsProducts.description}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {docsProducts.products.map((product, index) => (
          <a
            key={product.href}
            href={product.href}
            className="group flex flex-col rounded-2xl border border-border bg-surface px-6 py-7 transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
          >
            <span className="text-white">
              <ProductIcon index={index} />
            </span>
            <h2 className="mt-6 font-heading text-white text-xl tracking-[-0.02em]">
              {product.label}
            </h2>
            <p className="mt-3 text-muted text-base leading-7 tracking-[-0.01em]">
              {product.description}
            </p>
            <span className="mt-8 text-sm tracking-[-0.01em] text-white/70 group-hover:text-white transition-colors">
              Open documentation →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
