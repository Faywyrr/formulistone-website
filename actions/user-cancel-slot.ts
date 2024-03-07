"use server";

import { CRENAUX } from "@/lib/reservation";
import { ActionError, authAction } from "@/lib/safe-action";
import { deleteSlot, getSlot } from "@/lib/slot";
import { z } from "zod";

const schema = z.object({
  hour: z.string(),
});

const slotCancelAction = authAction(schema, async ({ hour }, { user }) => {
  if (!CRENAUX.includes(hour)) throw new ActionError("Créneau invalide");

  const slot = await getSlot(hour);

  if (!slot) throw new ActionError("Créneau invalide");

  if (!user.slots.some((slot) => slot.hour === hour))
    throw new ActionError("Vous n'avez pas réservé ce créneau");

  const result = await deleteSlot(hour);

  if (!result) throw new ActionError("Une erreur est survenue");

  return true;
});

export default slotCancelAction;
