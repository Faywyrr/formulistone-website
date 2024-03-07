"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOut() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = () => {
    setLoading(true);
    signOut({ callbackUrl: "/" });
  };

  return (
    <button
      className="btn btn-outline btn-accent uppercase"
      onClick={handleSignOut}
    >
      {loading && <span className="loading loading-spinner loading-sm"></span>}
      Se déconnecter
    </button>
  );
}
