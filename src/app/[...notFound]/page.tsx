import Link from "next/link";

export default function CatchAllNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4 py-16 text-center gap-6">
      <h1 className="text-4xl md:text-6xl font-bold">Page Not Found</h1>
      <p className="text-lg md:text-xl text-white/80 max-w-2xl">
        The page you&apos;re looking for doesn&apos;t exist yet. Please check the URL or explore the pages we&apos;ve already migrated below.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all"
        >
          Go to Home
        </Link>
        <Link
          href="/case-studies"
          className="bg-white/10 px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/20 transition-all"
        >
          View Case Studies
        </Link>
      </div>
    </div>
  );
}
