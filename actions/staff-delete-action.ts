"use server";

import { ActionError, adminAction } from "@/lib/safe-action";
import { deleteStaff, getStaff } from "@/lib/staff";
import { z } from "zod";

const schema = z.object({
  id: z.string().uuid(),
});

const staffDeleteAction = adminAction(schema, async ({ id }) => {
  const staff = await getStaff(id);

  if (!staff) throw new ActionError("Staff not found");

  const result = await deleteStaff(id);

  if (!result) throw new ActionError("Staff not deleted");

  return true;
});

export default staffDeleteAction;
