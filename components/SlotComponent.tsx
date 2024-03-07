"use client";

import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import SlotConfirmModal from "./modal/SlotConfirmModal";
import SlotCancelModal from "./modal/SlotCancelModal";

export default function SlotComponent({
  hour,
  claim,
  deletable,
}: {
  hour: string;
  claim: boolean;
  deletable: boolean;
}) {
  const router = useRouter();

  const [ConfirmModalComponent, openConfirm, setOpenConfirm] = useModal(
    <SlotConfirmModal hour={hour} />,
  );
  const [CancelModalComponent, openCancel, setOpenCancel] = useModal(
    <SlotCancelModal hour={hour} />,
  );

  return (
    <>
      <ConfirmModalComponent />
      <CancelModalComponent />

      {deletable ? (
        <button
          className="btn btn-secondary"
          onClick={() => setOpenCancel(true)}
        >
          ANNULER : {hour}
        </button>
      ) : claim ? (
        <button disabled className="btn btn-disabled">
          {hour}
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={() => setOpenConfirm(true)}
        >
          {hour}
        </button>
      )}
    </>
  );
}
