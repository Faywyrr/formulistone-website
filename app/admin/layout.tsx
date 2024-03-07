import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: JSX.Element;
}) {
  const user = await getUser();
  if (!user || !user.admin) return redirect("/");

  return children;
}
