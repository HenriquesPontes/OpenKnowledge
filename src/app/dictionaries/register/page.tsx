import { permanentRedirect } from "next/navigation";

export default function DictionaryRegisterPage() {
  permanentRedirect("/api/register");
}
