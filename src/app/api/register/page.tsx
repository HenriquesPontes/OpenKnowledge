import { ApiAuthScreen } from "@/components/sections/ApiAuthForm";
import { readApiSession } from "@/lib/api-session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create an account",
  robots: { index: false, follow: true },
};

export default async function ApiRegisterPage() {
  const session = await readApiSession();
  if (session) redirect("/api#dashboard");

  return <ApiAuthScreen mode="register" />;
}
