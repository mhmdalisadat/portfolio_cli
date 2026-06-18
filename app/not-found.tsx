import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "./lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Page Not Found",
  description: "The requested page could not be found.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main
      className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center"
      style={{ backgroundColor: "#0c3649" }}
    >
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#00c9d3]/70 mb-3">
        404
      </p>
      <h1 className="text-2xl sm:text-3xl font-normal text-[#00c9d3] mb-3">
        Page not found
      </h1>
      <p className="text-sm sm:text-base text-[#dce8ef]/70 font-mono max-w-md mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-lg border border-[#00c9d3]/35 px-4 py-2 text-sm text-[#00c9d3] transition-colors hover:bg-[#00c9d3]/10"
      >
        Back to home
      </Link>
    </main>
  );
}
