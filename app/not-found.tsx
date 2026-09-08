import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="text-center">
        <div className="text-7xl font-bold text-red-600">404</div>

        <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>

        <p className="mt-2 text-zinc-400">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
