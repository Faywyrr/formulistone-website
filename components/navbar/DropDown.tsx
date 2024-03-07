"use client";

import Link from "next/link";
import NAVBAR from "@/lib/navbar";

export default function DropDown() {
  const handleClick = () => {
    const element = document.activeElement as HTMLElement;
    if (element) element.blur();
  };

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost p-0 lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        {NAVBAR.map((item) => (
          <li key={item.title} onClick={handleClick}>
            <Link href={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
