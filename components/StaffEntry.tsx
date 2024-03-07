"use client";

import { useModal } from "@/hooks/useModal";
import { PrismaStaff } from "@/types/user";
import StaffEditModal from "./modal/StaffEditModal";
import StaffDeleteModal from "./modal/StaffDeleteModal";
import Image from "next/image";

export default function StaffEntry({ staff }: { staff: PrismaStaff }) {
  const [StaffEditModalComponent, openEdit, setOpenEdit] = useModal(
    <StaffEditModal staff={staff} />,
  );

  const [StaffDeleteModalComponent, openDelete, setOpenDelete] = useModal(
    <StaffDeleteModal staff={staff} />,
  );

  return (
    <>
      <StaffEditModalComponent />
      <StaffDeleteModalComponent />
      <tr>
        <td>
          <Image src={staff.image} alt={staff.name} width={60} height={60} />
        </td>
        <td>{staff.name}</td>
        <td>{staff.description}</td>
        <td>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => setOpenEdit(true)}
              className="btn btn-primary"
            >
              Modifier
            </button>
            <button
              onClick={() => setOpenDelete(true)}
              className="btn btn-accent"
            >
              Supprimer
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
