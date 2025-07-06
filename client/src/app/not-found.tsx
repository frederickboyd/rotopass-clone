import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      <Link href="/" className="mt-6 text-blue-500 underline">
        Go Home
      </Link>
    </div>
  );
}
