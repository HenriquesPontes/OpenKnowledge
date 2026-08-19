import { Button } from "@/components/ui/Button";
import { apiPaths } from "@/lib/constants";
import { API_ORIGIN } from "@/lib/catalog";

export default function ApiReferencePage() {
  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        API reference
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        Read-only GET routes on {API_ORIGIN.replace("https://", "")}. Country
        families live under /v1/saotome, /v1/caboverde, /v1/guinebissau, and
        /v1/angola.
      </p>

      <ul className="mt-10 divide-y divide-border border-t border-b border-border">
        {apiPaths.map((item) => (
          <li key={item.path} className="py-4">
            <p className="text-white text-base tracking-[-0.01em]">
              {item.method} {item.path}
            </p>
            <p className="mt-1 text-muted text-base tracking-[-0.01em]">
              {item.detail}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-muted text-base leading-7 tracking-[-0.01em]">
        /v1/saotome, /v1/caboverde, and /v1/guinebissau are indexes, not merged
        lexicons. /v1/angola is Angola Contruy, not Angolar.
      </p>
      <div className="mt-8">
        <Button href={`${API_ORIGIN}/docs`}>OpenAPI playground</Button>
      </div>
    </>
  );
}
