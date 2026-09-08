"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
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
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 text-6xl font-bold text-red-600">500</div>

        <h1 className="text-2xl font-semibold">Something went wrong</h1>

        <p className="mt-3 text-zinc-400">
          We couldn&apos;t complete your request. Please try again.
        </p>

        <Button onClick={reset} className="mt-6 bg-red-600 hover:bg-red-700">
          Try again
        </Button>
      </div>
    </main>
  );
}
