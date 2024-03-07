import Logo from "@/assets/logo.png";
import { getUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import DropDown from "./DropDown";
import NAVBAR from "@/lib/navbar";

export default async function NavBar() {
  const user = await getUser();

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <DropDown />
        <Link className="btn btn-ghost text-xl" href="/">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          Formulist One
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {NAVBAR.map((item) => (
            <li key={item.title}>
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end gap-4">
        {user?.admin && (
          <Link href="/admin" className="btn btn-accent">
            Admin
          </Link>
        )}
        {user ? (
          <Link href="/profile" className="btn btn-secondary">
            {user.firstName}
          </Link>
        ) : (
          <Link href="/login" className="btn btn-primary">
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}
