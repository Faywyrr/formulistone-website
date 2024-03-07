import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LoginErrors: { [key: string]: string } = {
  CredentialsSignin: "Identifiant ou mot de passe incorrect",
  Default: "Une erreur s'est produite",
};
