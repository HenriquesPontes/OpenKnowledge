import { ApiAuthScreen } from "@/components/sections/ApiAuthForm";
import { readApiSession } from "@/lib/api-session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Log in",
  robots: { index: false, follow: true },
};

export default async function ApiLoginPage() {
  const session = await readApiSession();
  if (session) redirect("/api#dashboard");

  return <ApiAuthScreen mode="login" />;
}
