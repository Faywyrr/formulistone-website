import UserEntry from "@/components/UserEntry";
import { getUsers } from "@/lib/user";

export default async function AdminUser() {
  const users = await getUsers();

  return (
    <main className="flex flex-col gap-6 p-4">
      <div>
        <h1 className="text-3xl font-bold">Utilisateurs</h1>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserEntry key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
