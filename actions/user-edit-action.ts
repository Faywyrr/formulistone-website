"use server";

import { ActionError, adminAction } from "@/lib/safe-action";
import { editUser, getUserById } from "@/lib/user";
import { z } from "zod";

const schema = z.object({
  id: z.string().uuid(),
  admin: z.boolean(),
  disabled: z.boolean(),
});

const userEditAction = adminAction(schema, async ({ id, admin, disabled }) => {
  const user = await getUserById(id);

  if (!user) throw new ActionError("User not found");

  const result = await editUser(id, {
    admin,
    disabled,
  });

  if (!result) throw new ActionError("Failed to edit user");

  return true;
});

export default userEditAction;
