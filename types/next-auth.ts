import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    error?: string;
    user: User;
  }

  interface User {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
