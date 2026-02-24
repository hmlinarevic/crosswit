"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
      return;
    }
    router.push(searchParams.get("callbackUrl") || "/");
    router.refresh();
  };

  return (
    <section className="dark:bg-base flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm rounded-lg border border-neutral-600 bg-neutral-800/50 p-6 shadow-lg">
        <h1 className="mb-4 text-center font-titilliumWeb text-xl text-rose">
          Sign in
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="rounded bg-red-900/50 px-3 py-2 text-sm text-red-200">
              {error}
            </p>
          )}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm text-neutral-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-neutral-600 bg-neutral-700 px-3 py-2 text-white placeholder-neutral-500 focus:border-rose focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm text-neutral-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border border-neutral-600 bg-neutral-700 px-3 py-2 text-white placeholder-neutral-500 focus:border-rose focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-rose py-2 font-medium text-white transition hover:bg-rose/90 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-neutral-400">
          No account?{" "}
          <Link href="/auth/signup" className="text-rose hover:underline">
            Sign up
          </Link>
        </p>
        <p className="mt-2 text-center">
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-neutral-300"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </section>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading…</div>}>
      <SignInForm />
    </Suspense>
  );
}
