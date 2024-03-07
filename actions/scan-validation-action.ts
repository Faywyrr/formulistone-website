"use server";

import { sendMail } from "@/lib/mail";
import { getQrCode } from "@/lib/qrcode";
import { getQuestionByUserId } from "@/lib/question";
import { ActionError, authAction } from "@/lib/safe-action";
import { getStaffs } from "@/lib/staff";
import { editUser } from "@/lib/user";
import { z } from "zod";

const schema = z.object({
  qrCodeId: z.string(),
  answer: z.string(),
});

const scanValidationAction = authAction(
  schema,
  async ({ qrCodeId, answer }, { user }) => {
    const qrCode = await getQrCode(qrCodeId);
    if (!qrCode) throw new ActionError("QR Code not found");

    const question = getQuestionByUserId(user.id, qrCode.staff.questions);
    if (!question) throw new ActionError("Question not found");

    if (question.answer.toLowerCase().trim() !== answer.toLowerCase().trim())
      throw new ActionError("Mauvaise réponse !");

    if (user.scans.some((s) => s.qrCode.staffId === qrCode.staffId))
      throw new ActionError("Vous avez déjà scanné ce QR Code");

    const result = await editUser(user.id, {
      scans: {
        create: {
          qrCode: {
            connect: {
              id: qrCode.id,
            },
          },
        },
      },
    });

    if (!result) throw new ActionError("Une erreur est survenue");

    const staffs = await getStaffs();

    if (user.scans.length + 1 === staffs.length) {
      const result = await sendMail(
        "[GAGNANT] JEU CONCOURS",
        user.firstName +
          " " +
          user.lastName +
          " a scanné tous les QR Codes ! Son email est " +
          user.email,
      );

      if (!result) throw new ActionError("Une erreur est survenue");

      return 1;
    }

    return 0;
  },
);

export default scanValidationAction;
