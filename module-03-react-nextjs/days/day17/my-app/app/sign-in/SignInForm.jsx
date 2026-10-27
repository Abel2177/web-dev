"use client";

import { useActionState } from "react";
import { signIn } from "./actions";

const initialState = { error: "" };

export default function SignInForm({ next }) {
  const [state, formAction, pending] = useActionState(
    signIn,
    initialState
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="email" className="mb-1 block">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border p-3"
        />
      </div>

      {state.error && <p role="alert" className="text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-orange-600 p-3 font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}