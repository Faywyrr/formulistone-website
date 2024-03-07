import Member from "@/components/Member";
import { getStaffs } from "@/lib/staff";

export default async function Members() {
  const staffs = await getStaffs();

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold">Nos membres</h1>
      <div className="flex flex-row flex-wrap justify-center gap-4 sm:gap-x-60">
        {staffs.map((staff, i) => (
          <Member key={i} member={staff} />
        ))}
      </div>
    </div>
  );
}
