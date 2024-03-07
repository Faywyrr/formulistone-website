"use client";

import { useModal } from "@/hooks/useModal";
import StaffAddModal from "./modal/StaffAddModal";

export default function StaffAdd() {
  const [StaffAddModalComponent, open, setOpen] = useModal(<StaffAddModal />);

  return (
    <>
      <StaffAddModalComponent />
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        Ajouter
      </button>
    </>
  );
}
