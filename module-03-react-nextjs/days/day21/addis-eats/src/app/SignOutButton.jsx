"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button id="signout-btn" className="nav-signout-btn" type="button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
