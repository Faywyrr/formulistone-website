"use server";

import { CRENAUX } from "@/lib/reservation";
import { ActionError, authAction } from "@/lib/safe-action";
import { getSlot } from "@/lib/slot";
import { editUser } from "@/lib/user";
import { z } from "zod";

const schema = z.object({
  hour: z.string(),
});

const slotClaimAction = authAction(schema, async ({ hour }, { user }) => {
  if (!CRENAUX.includes(hour)) throw new ActionError("Créneau invalide");

  if (user.slots.length >= 1)
    throw new ActionError("Impossible de réserver plusieurs créneaux");

  const slot = await getSlot(hour);

  if (slot) throw new ActionError("Créneau déjà réservé");

  const result = await editUser(user.id, {
    slots: {
      create: {
        hour,
      },
    },
  });

  if (!result) throw new ActionError("Une erreur est survenue");

  return true;
});

export default slotClaimAction;
