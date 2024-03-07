"use client";

import scanValidationAction from "@/actions/scan-validation-action";
import { useModal } from "@/hooks/useModal";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

export function ScanValidation({
  qrCodeId,
  question,
}: {
  qrCodeId: string;
  question: string;
}) {
  const router = useRouter();

  const [ModalComponent, open, setOpen] = useModal(
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">🎉 Bravo !</h1>
      <p>
        Vous avez scanné tous les QR Codes ! Vous allez être contacté sous peu
        sur votre mail étudiant pour recevoir votre récompense !
      </p>
    </div>,
  );

  const { execute, result, status } = useAction(scanValidationAction, {
    onSuccess: (e) => {
      if (e === 1) {
        setOpen(true);
        setTimeout(() => {
          router.push("/profile");
        }, 10000);
      } else {
        router.push("/profile");
      }
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute({
      qrCodeId: qrCodeId,
      answer: e.currentTarget.answer.value,
    });
  };

  return (
    <>
      <ModalComponent />
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-bold">Validation</h2>

        {(result.fetchError || result.serverError) && (
          <div className="alert alert-error">
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
            <span>{result.fetchError || result.serverError}</span>
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">{question}</span>
            </label>
            <input
              required
              type="text"
              className="input input-bordered"
              placeholder="Réponse"
              name="answer"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            {status == "executing" && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            Valider
          </button>
        </form>
      </div>
    </>
  );
}
