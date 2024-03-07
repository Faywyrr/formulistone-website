import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ReservationLayout({
  children,
  params,
}: {
  children: JSX.Element;
  params: { id: string };
}) {
  const user = await getUser();
  if (!user) return redirect("/login?redirect=/reservation");

  return children;
}
