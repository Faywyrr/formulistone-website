import { createSafeActionClient } from "next-safe-action";
import { getUser } from "./auth";

const handleReturnedServerError = (error: Error) => {
  if (error instanceof ActionError) return error.message;

  return "An error occurred";
};

export const action = createSafeActionClient({
  handleReturnedServerError,
});
export class ActionError extends Error {}

export const authAction = createSafeActionClient({
  handleReturnedServerError: (error: Error) => {
    if (error instanceof ActionError) return error.message;

    return "An error occurred";
  },
  async middleware() {
    const user = await getUser();

    if (!user) throw new ActionError("Not authenticated");

    return {
      user: user,
    };
  },
});

export const adminAction = createSafeActionClient({
  handleReturnedServerError,
  async middleware() {
    const user = await getUser();

    if (!user) throw new ActionError("Not authenticated");
    if (!user.admin) throw new ActionError("Not authorized");

    return {
      user: user,
    };
  },
});
