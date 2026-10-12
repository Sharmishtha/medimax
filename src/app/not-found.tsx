import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <img src="/logo-mark.png" alt="" className="h-20 w-20" />
      <h1 className="text-4xl font-black">Page not found</h1>
      <Link href="/" className="pill bg-blue text-white">Back to home</Link>
    </main>
  );
}
