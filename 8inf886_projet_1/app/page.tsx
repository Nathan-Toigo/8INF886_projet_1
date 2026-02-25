import { redirect } from "next/navigation";

export default function RootPage() {
  // This performs a server-side redirect immediately
  redirect("/login");

  // This part will never actually render
  return null;
}
