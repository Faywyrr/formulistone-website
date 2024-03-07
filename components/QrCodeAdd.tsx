"use client";

import { useModal } from "@/hooks/useModal";
import QrCodeAddModal from "./modal/QrCodeAddModal";
import { PrismaStaff } from "@/types/user";

export default function QrCodeAdd({ staffs }: { staffs: PrismaStaff[] }) {
  const [QrCodeAddModalComponent, open, setOpen] = useModal(
    <QrCodeAddModal staffs={staffs} />,
  );

  return (
    <>
      <QrCodeAddModalComponent />
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        Ajouter
      </button>
    </>
  );
}
