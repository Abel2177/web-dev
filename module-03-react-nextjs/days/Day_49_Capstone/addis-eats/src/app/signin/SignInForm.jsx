"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm({ next, users = [] }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Invalid credentials.");
        return;
      }

      // Redirect to the intended destination after successful sign-in
      window.location.href = next;
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form className="signin-form" onSubmit={handleSubmit} noValidate>
        <label>
          Email
          <input
            id="signin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="almaz@addis-eats.com"
            autoComplete="email"
            required
          />
        </label>
        <label>
          Password
          <input
            id="signin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </label>
        {error && <p className="field-error">{error}</p>}
        <button id="signin-submit" className="add-to-cart" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Sign In"}
        </button>
      </form>

      {users.length > 0 && (
        <div className="demo-accounts">
          <h3>Demo Accounts (Click to Fill)</h3>
          <ul>
            {users.map((u) => (
              <li key={u.email}>
                <button
                  type="button"
                  className="demo-account-btn"
                  onClick={() => {
                    setEmail(u.email);
                    setPassword(u.password);
                  }}
                >
                  <strong>{u.name}</strong>
                  <span className="demo-role">{u.role}</span>
                  <span className="demo-email">{u.email}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
