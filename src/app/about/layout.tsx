export const metadata = {
  title: "About ForroVivo",
  description:
    "ForroVivo is the platform. It documents, preserves, and structures African Creole languages. Open Knowledge is the public front door.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
