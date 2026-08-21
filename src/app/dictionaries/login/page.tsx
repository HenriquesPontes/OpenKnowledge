import { permanentRedirect } from "next/navigation";

export default function DictionaryLoginPage() {
  permanentRedirect("/api/login");
}
