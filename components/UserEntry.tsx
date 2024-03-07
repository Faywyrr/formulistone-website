"use client";

import { useModal } from "@/hooks/useModal";
import { PrismaUser } from "@/types/user";
import UserEditModal from "./modal/UserEditModal";

export default function UserEntry({ user }: { user: PrismaUser }) {
  const [UserEditModalComponent, open, setOpen] = useModal(
    <UserEditModal user={user} />,
  );

  return (
    <>
      <UserEditModalComponent />
      <tr>
        <td>
          {user.firstName} {user.lastName}
        </td>
        <td>{user.email}</td>
        <td>
          <button onClick={() => setOpen(true)} className="btn btn-primary">
            Modifier
          </button>
        </td>
      </tr>
    </>
  );
}
