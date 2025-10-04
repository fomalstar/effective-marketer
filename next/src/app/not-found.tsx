import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Effective Marketer",
  description:
    "The page you requested is unavailable. Explore Effective Marketer's AI SEO services or reach out through our contact section.",
};

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="max-w-2xl text-center space-y-6">
        <span className="inline-flex items-center rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
          404
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          We could not find the page you were looking for
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Check the URL for typos or head back to the homepage to continue exploring our AI SEO services.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 text-white font-semibold shadow-md transition-transform hover:scale-[1.02] hover:shadow-lg"
          >
            Return to homepage
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-lg border border-primary-200 px-6 py-3 text-primary-700 font-semibold transition-colors hover:bg-primary-50"
          >
            Talk to our team
          </Link>
        </div>
      </div>
    </main>
  );
}

