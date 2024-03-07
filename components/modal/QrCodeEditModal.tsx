import { ModalContext } from "@/components/modal/ModalComponent";
import { PrismaQrCode } from "@/types/user";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import qrCodeEditAction from "../../actions/qrcode-edit-action";

export default function QrCodeEditModal({ qrCode }: { qrCode: PrismaQrCode }) {
  const router = useRouter();
  const { open, setOpen } = useContext(ModalContext);

  const { execute, result, status } = useAction(qrCodeEditAction, {
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute({
      id: qrCode.id,
      disabled: e.currentTarget.disabled.checked,
    });
  };

  return (
    <>
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
            <span className="label-text">Désactivé</span>
          </label>
          <input
            type="checkbox"
            className="checkbox-primary checkbox"
            defaultChecked={qrCode.disabled}
            name="disabled"
          />
        </div>

        <div className="flex flex-row justify-end gap-2">
          {status === "executing" && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          <button className="btn btn-primary">Sauvegardé</button>
        </div>
      </form>
    </>
  );
}
