import { DocsShell } from "@/components/sections/DocsShell";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex-1 pt-24 pb-20 sm:pt-28 lg:pt-36">
      <DocsShell>{children}</DocsShell>
    </section>
  );
}
