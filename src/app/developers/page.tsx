import { redirect } from "next/navigation";

export const metadata = {
  title: "Developers",
  robots: { index: false, follow: true },
};

export default function DevelopersPage() {
  redirect("/docs");
}
