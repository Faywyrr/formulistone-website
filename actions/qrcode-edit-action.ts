"use server";

import { editQrCode, getQrCode } from "@/lib/qrcode";
import { ActionError, adminAction } from "@/lib/safe-action";
import { z } from "zod";

const schema = z.object({
  id: z.string().uuid(),
  disabled: z.boolean(),
});

const qrCodeEditAction = adminAction(schema, async ({ id, disabled }) => {
  const qrCode = await getQrCode(id);

  if (!qrCode) throw new ActionError("QR Code not found");

  const result = await editQrCode(id, { disabled });

  if (!result) throw new ActionError("QR Code not edited");

  return true;
});

export default qrCodeEditAction;
