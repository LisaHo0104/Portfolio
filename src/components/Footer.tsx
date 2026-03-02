import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-white/60">
          Built with Next.js, shadcn/ui &{" "}
          <a
            href="https://reactbits.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target underline hover:text-white"
          >
            React Bits
          </a>
        </p>
        <div className="flex gap-6">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target text-sm text-white/60 hover:text-white"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target text-sm text-white/60 hover:text-white"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
