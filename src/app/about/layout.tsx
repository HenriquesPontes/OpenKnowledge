export const metadata = {
  title: "About ForroVivo",
  description:
    "ForroVivo documents, preserves, and structures African Creole languages, and makes them accessible to new generations. Open Knowledge is the public home of that work.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
