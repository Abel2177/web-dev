"use client";

export default function Error({ error, reset }) {
  return (
    <main>
      <h1>Something went wrong!</h1>

      <p>
        We couldn't load the Addis Eats menu.
      </p>

      <button onClick={() => reset()}>
        Try Again
      </button>
    </main>
  );
}