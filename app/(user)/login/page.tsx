"use client";

import LoginEmailModal from "@/components/modal/LoginEmailModal";
import { useModal } from "@/hooks/useModal";
import { LoginErrors } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/profile";
  const router = useRouter();

  const [ModalComponent, open, setOpen] = useModal(
    <LoginEmailModal redirect={redirect} />,
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    signIn("credentials", {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      callbackUrl: redirect,
      redirect: false,
    }).then((r) => {
      setLoading(false);

      if (r?.ok) {
        router.push(redirect);
        router.refresh();
      } else if (r?.error) setError(r.error);
    });
  };

  return (
    <>
      <ModalComponent />

      <main className="flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold">Connexion ENT</h1>
        <p className="text-xl">Veuillez utiliser vos identifiants de l'ENT</p>
        <p className="font-bold text-accent">
          Aucun mot de passe n'est stocké sur ce site
        </p>
        {error && (
          <div role="alert" className="alert alert-error w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{LoginErrors[error] || LoginErrors.Default}</span>
          </div>
        )}
        <form className="mt-4 flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            className="input input-primary"
            type="text"
            name="username"
            placeholder="Identifiant"
          />
          <input
            className="input input-secondary"
            type="password"
            name="password"
            placeholder="Mot de passe"
          />
          <button className="btn btn-primary" type="submit">
            {loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            Se connecter
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setOpen(true)}
          >
            Se connecter par mail (sans mot de passe)
          </button>
        </form>
      </main>
    </>
  );
}
