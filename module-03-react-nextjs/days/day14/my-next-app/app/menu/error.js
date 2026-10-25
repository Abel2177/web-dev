
"use client";

export default function Error({ error, reset }) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Something went wrong!</h1>
      <p className="my-4">
        We encountered an error while loading the menu.
        Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-lg bg-orange-600 px-4 py-2 text-white"
      >
        Try Again
      </button>
    </main>
  );
}