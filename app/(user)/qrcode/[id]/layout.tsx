import { getUser } from "@/lib/auth";
import { getQrCodeByCode } from "@/lib/qrcode";
import { notFound, redirect } from "next/navigation";

const END = true

export default async function QrCodeLayout({
  children,
  params,
}: {
  children: JSX.Element;
  params: { id: string };
}) {
  if (END) {
    return redirect("/");
  }

  const user = await getUser();
  if (!user) return redirect("/login?redirect=/qrcode/" + params.id);

  const qrCode = await getQrCodeByCode(params.id);
  if (!qrCode) return notFound();
  if (qrCode.disabled) return redirect("/");

  if (user.scans.find((scan) => scan.qrCode.staffId === qrCode?.staffId))
    return redirect("/profile");

  return children;
}
