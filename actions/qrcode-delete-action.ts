"use server";

import { deleteQrCode, getQrCode } from "@/lib/qrcode";
import { ActionError, adminAction } from "@/lib/safe-action";
import { getStaff } from "@/lib/staff";
import { editUser, getUserById } from "@/lib/user";
import { z } from "zod";

const schema = z.object({
  id: z.string().uuid(),
});

const qrCodeDeleteAction = adminAction(schema, async ({ id }) => {
  const qrCode = await getQrCode(id);

  if (!qrCode) throw new ActionError("QR Code not found");

  const result = await deleteQrCode(id);

  if (!result) throw new ActionError("QR Code not deleted");

  return true;
});

export default qrCodeDeleteAction;
