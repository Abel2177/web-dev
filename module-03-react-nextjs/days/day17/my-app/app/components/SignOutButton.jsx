import { signOut } from "@/app/sign-in/actions";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button type="submit" className="underline">
        Sign out
      </button>
    </form>
  );
}