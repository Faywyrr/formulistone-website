import Image from "next/image";
import { MemberProps } from "../Member";

export default function MemberModal({ member }: { member: MemberProps }) {
  const { name, role, description, image } = member;

  return (
    <div className="flex flex-col justify-between px-2 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{name}</h1>
        <div className="flex flex-row flex-wrap gap-2">
          {role.split(",").map((r, i) => (
            <div className="badge badge-primary" key={i}>
              {r}
            </div>
          ))}
        </div>
        <p>{description}</p>
      </div>
      <div className="avatar shrink-0">
        <div className="m-auto size-64 rounded-full">
          <Image width={64} height={64} src={image} alt={name} />
        </div>
      </div>
    </div>
  );
}
