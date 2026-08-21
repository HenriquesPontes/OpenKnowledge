import Image from "next/image";
import { cookies } from "next/headers";
import { docsProducts as docsProductsEn } from "@/lib/constants";
import { LOCALE_COOKIE, localeFromCookie, getSiteCopy } from "@/lib/i18n";

export const metadata = {
  title: "Documentation",
  description: docsProductsEn.description,
  alternates: { canonical: "/docs" },
};

function ProductIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <Image
        src="/images/logo-icon.png"
        alt=""
        width={512}
        height={512}
        sizes="28px"
        className="h-7 w-7"
      />
    );
  }
  if (index === 1) {
    return (
      <Image
        src="/images/app/phone-hero.png"
        alt=""
        width={1024}
        height={1024}
        sizes="28px"
        className="h-7 w-7"
      />
    );
  }
  return (
    <Image
      src="/images/app/ForroConnect.png"
      alt=""
      width={512}
      height={512}
      sizes="28px"
      className="h-7 w-7 invert"
    />
  );
}

export default async function DocsIndexPage() {
  const locale = localeFromCookie((await cookies()).get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);
  const docsProducts = copy.docsProducts;

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
              {copy.docsHub.openDocsCta}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
