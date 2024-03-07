"use server";

import { createQrCode } from "@/lib/qrcode";
import { ActionError, adminAction } from "@/lib/safe-action";
import { getStaff } from "@/lib/staff";
import { z } from "zod";

const schema = z.object({
  staffId: z.string().uuid(),
});

function randomCode() {
  return Math.random().toString(36).substring(2, 8);
}

const qrCodeAddAction = adminAction(schema, async ({ staffId }) => {
  const staff = await getStaff(staffId);

  if (!staff) throw new ActionError("Staff not found");

  const qrCode = await createQrCode({
    code: randomCode(),
    staff: {
      connect: {
        id: staffId,
      },
    },
  });

  if (!qrCode) throw new ActionError("QR Code not created");

  return true;
});

export default qrCodeAddAction;
