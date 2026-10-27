import SignInForm from "./SignInForm";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const next =
    typeof params?.next === "string" ? params.next : "/menu";

  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold">Sign in to Addis Eats</h1>
      <SignInForm next={next} />
    </main>
  );
}