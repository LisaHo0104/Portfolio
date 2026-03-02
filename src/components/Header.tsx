"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4 sm:px-6 sm:pt-5">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between rounded-full border border-white/[0.06] bg-[#1e162b]/12 px-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] backdrop-blur-2xl sm:px-8">
        <Link
          href="/"
          className="cursor-target font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <span className="text-[1.05rem]">Lisa Ho</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {[
            { href: "/#about", label: "About" },
            { href: "/#projects", label: "Projects" },
            { href: "/#contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group cursor-target relative rounded-full px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute inset-0 rounded-full bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className="cursor-target ml-2 rounded-full border border-white/20 bg-white px-4 font-medium text-black shadow-lg shadow-white/5 transition-all hover:border-white/40 hover:bg-white hover:shadow-white/10"
          >
            <Link href="/#contact">Hire me</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
