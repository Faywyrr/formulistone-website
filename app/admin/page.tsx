import QrCodeAdd from "@/components/QrCodeAdd";
import QrCodeEntry from "@/components/QrCodeEntry";
import StaffAdd from "@/components/StaffAdd";
import StaffEntry from "@/components/StaffEntry";
import { getQrCodes } from "@/lib/qrcode";
import { getStaffs } from "@/lib/staff";
import { getUsers } from "@/lib/user";
import Link from "next/link";

export default async function Admin() {
  const qrCodes = await getQrCodes();
  const users = await getUsers();
  const staffs = await getStaffs();

  return (
    <main className="flex flex-col gap-6 p-4">
      <div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold">Staffs</h1>
          <StaffAdd />
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff) => (
                <StaffEntry key={staff.id} staff={staff} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-bold">Qr Codes</h1>
          <QrCodeAdd staffs={staffs} />
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Code</th>
                <th>Staff</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {qrCodes.map((qrCode) => (
                <QrCodeEntry key={qrCode.id} qrCode={qrCode} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Utilisateurs</h1>
        <Link className="btn btn-primary" href="/admin/users">
          Cliquez ici pour voir les utilisateurs
        </Link>
      </div>
    </main>
  );
}
