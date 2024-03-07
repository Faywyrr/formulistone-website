import { ModalContext } from "@/components/modal/ModalComponent";
import { PrismaStaff } from "@/types/user";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import qrCodeAddAction from "@/actions/qrcode-add-action";

export default function QrCodeAddModal({ staffs }: { staffs: PrismaStaff[] }) {
  const router = useRouter();
  const { open, setOpen } = useContext(ModalContext);

  const { execute, result, status } = useAction(qrCodeAddAction, {
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    execute({
      staffId: e.currentTarget.staff.value,
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
            <span className="label-text">Staff</span>
          </label>
          <select
            required
            name="staff"
            className="select select-bordered w-full"
            defaultValue={staffs.length > 0 ? staffs[0].id : "No staff"}
          >
            {staffs.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-row justify-end gap-2">
          {status === "executing" && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          <button className="btn btn-primary">Créer</button>
        </div>
      </form>
    </>
  );
}
