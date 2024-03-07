"use client";

import { useModal } from "@/hooks/useModal";
import AlloSecretModal from "./modal/AlloSecretModal";

export default function AlloSecret() {
  const [ModalComponent, open, setOpen] = useModal(<AlloSecretModal />);

  return (
    <>
      <ModalComponent />
      <div className="size-16" onClick={() => setOpen(true)}></div>
    </>
  );
}
