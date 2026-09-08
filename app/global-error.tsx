"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-md text-center">
            <div className="text-6xl font-bold text-red-600">500</div>

            <h1 className="mt-4 text-2xl font-semibold">
              Something went wrong
            </h1>

            <p className="mt-3 text-zinc-400">
              An unexpected error occurred. Please try again.
            </p>

            <button
              type="button"
              onClick={() => reset()}
              className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-5 text-sm font-medium text-white transition-colors hover:bg-red-700"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
