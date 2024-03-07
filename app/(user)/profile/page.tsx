import Member from "@/components/Member";
import SignOut from "@/components/SignOut";
import { getStrictUser } from "@/lib/auth";
import { getStaffs } from "@/lib/staff";

export default async function Profile() {
  const user = await getStrictUser();
  const staffs = await getStaffs();
  const progress = (user.scans.length / staffs.length) * 100;

  return (
    <main className="flex flex-row flex-wrap items-baseline justify-around gap-6 p-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="mb-4 text-4xl font-bold">Scans</h1>

        <div>
          <h2 className="text-2xl font-bold">Avancement</h2>
          <progress
            className="progress progress-accent"
            value={progress}
            max="100"
          ></progress>
        </div>

        <div>
          <p className="text-xl font-bold">Liste des scans</p>

          <div className="flex flex-col items-center justify-center gap-2">
            {user.scans.length == 0 ? (
              <p>Vous n'avez encore scanné aucun QR Code</p>
            ) : (
              user.scans.map((scan) => {
                const staff = scan.qrCode.staff;

                return (
                  <Member
                    key={staff.id}
                    member={{
                      name: staff.name,
                      role: staff.role,
                      description: staff.description,
                      image: staff.image,
                    }}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="mb-4 text-4xl font-bold">Profil</h1>

        {user.username && (
          <div className="flex size-full flex-col items-center justify-center">
            <p className="text-xl font-bold">Identifiant</p>
            <input
              className="input"
              disabled
              type="text"
              value={user.username}
            />
          </div>
        )}

        <div className="flex size-full flex-col items-center justify-center">
          <p className="text-xl font-bold">Nom</p>
          <input
            className="input"
            disabled
            type="text"
            value={user.firstName + " " + user.lastName}
          />
        </div>

        <div className="flex size-full flex-col items-center justify-center">
          <p className="text-xl font-bold">Email</p>
          <input className="input" disabled type="text" value={user.email} />
        </div>

        <SignOut />
      </div>
    </main>
  );
}
