import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: JSX.Element;
}) {
  const user = await getUser();
  if (!user) return redirect("/login");

  return children;
}
