import { useState } from "react";
import { signIn } from "next-auth/react";
import { LoginErrors } from "@/lib/utils";

export default function LoginEmailModal({ redirect }: { redirect: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    signIn(
      "email",
      {
        email: e.currentTarget.email.value + "@etu.univ-cotedazur.fr",
        callbackUrl: redirect,
        redirect: false,
      },
      { signin_type: "login" },
    ).then((r) => {
      setLoading(false);

      if (r?.ok) {
        setSent(true);
      } else if (r?.error) setError(r.error);
    });
  };

  return (
    <>
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

      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        {sent ? (
          <div>Email envoyé ! Regardez vos spams si vous ne recevez rien.</div>
        ) : (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email étudiant</span>
              </label>

              <div className="flex flex-row flex-wrap">
                <input
                  required
                  type="text"
                  className="input input-bordered w-32"
                  placeholder="jean.dupont"
                  name="email"
                />
                <input
                  readOnly
                  value="@etu.univ-cotedazur.fr"
                  className="input input-bordered w-fit"
                />
              </div>
            </div>

            <div className="flex flex-row justify-end gap-2">
              {loading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              <button className="btn btn-primary">Envoyer</button>
            </div>
          </>
        )}
      </form>
    </>
  );
}
