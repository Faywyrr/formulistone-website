"use client";

import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import MemberModal from "./modal/MemberModal";

export type MemberProps = {
  name: string;
  role: string;
  description: string;
  image: string;
};

export default function Member({ member }: { member: MemberProps }) {
  const { name, role, image } = member;

  const [ModalComponent, open, setOpen] = useModal(
    <MemberModal member={member} />,
  );

  return (
    <>
      <ModalComponent />

      <div
        className="flex w-full max-w-96 cursor-pointer flex-row items-center gap-4 rounded p-4 shadow"
        onClick={() => setOpen(true)}
      >
        <Image
          src={image}
          alt="Avatar"
          width={100}
          height={100}
          className="rounded"
        />
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">{name}</h3>
          <div className="flex flex-row flex-wrap gap-2">
            {role.split(",").map((r, i) => (
              <div className="badge badge-primary" key={i}>
                {r}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
