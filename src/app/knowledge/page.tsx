import { redirect } from "next/navigation";

export const metadata = {
  title: "Knowledge",
  robots: { index: false, follow: true },
};

export default function KnowledgePage() {
  redirect("/languages");
}
