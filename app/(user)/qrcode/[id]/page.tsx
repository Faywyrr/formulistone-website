import Member from "@/components/Member";
import { ScanValidation } from "@/components/ScanValidation";
import { getStrictUser } from "@/lib/auth";
import { getQrCodeByCode } from "@/lib/qrcode";
import { getQuestionByUserId } from "@/lib/question";
import { PrismaStaff } from "@/types/user";

export default async function QrCode({ params }: { params: { id: string } }) {
  const user = await getStrictUser();
  const qrCode = await getQrCodeByCode(params.id);
  const staff = qrCode?.staff as PrismaStaff;

  const randomQuestion = getQuestionByUserId(user.id, staff?.questions || []);

  return (
    <main className="flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-4xl font-bold">Vous avez scanné un QR Code</h1>
      <Member member={staff} />
      <ScanValidation
        qrCodeId={qrCode?.id || ""}
        question={randomQuestion?.question || ""}
      />
    </main>
  );
}
