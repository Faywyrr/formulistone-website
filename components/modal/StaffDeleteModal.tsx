import { ModalContext } from "@/components/modal/ModalComponent";
import { PrismaStaff } from "@/types/user";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import staffDeleteAction from "@/actions/staff-delete-action";

export default function StaffDeleteModal({ staff }: { staff: PrismaStaff }) {
  const router = useRouter();
  const { open, setOpen } = useContext(ModalContext);

  const { execute, result, status } = useAction(staffDeleteAction, {
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute({
      id: staff.id,
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
            <span className="label-text">
              Êtes-vous sûr de vouloir supprimer le staff {staff.name} ?
            </span>
          </label>
        </div>

        <div className="flex flex-row justify-end gap-2">
          {status === "executing" && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          <button className="btn btn-accent">Oui</button>
        </div>
      </form>
    </>
  );
}
