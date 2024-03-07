import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { getUserById } from "./user";

export async function getSession() {
  return getServerSession(authOptions);
}

export async function getUser() {
  const session = await getSession();
  if (session?.user?.id) return getUserById(session.user.id);

  return null;
}

export async function getStrictUser() {
  const user = await getUser();
  if (!user) throw new Error("User not found");

  return user;
}
