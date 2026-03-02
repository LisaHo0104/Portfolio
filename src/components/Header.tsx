"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="cursor-target font-semibold text-white">
          Lisa Ho
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/#about"
            className="cursor-target text-sm text-white/70 transition-colors hover:text-white"
          >
            About
          </Link>
          <Link
            href="/#projects"
            className="cursor-target text-sm text-white/70 transition-colors hover:text-white"
          >
            Projects
          </Link>
          <Link
            href="/#contact"
            className="cursor-target text-sm text-white/70 transition-colors hover:text-white"
          >
            Contact
          </Link>
          <Button asChild size="sm" className="cursor-target bg-white text-black hover:bg-white/90">
            <Link href="/#contact">Hire me</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
