"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { ScrollReveal } from "@/components/ScrollReveal";

const Lanyard = dynamic(() => import("@/components/Lanyard").then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div className="flex h-[720px] w-full min-h-[720px] max-w-[560px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#252525] to-[#0a0a0a] text-white/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),inset_0_-24px_32px_-8px_rgba(0,0,0,0.35)]">
      Loading…
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />

      <section id="about" className="pt-48 pb-20 pl-4 pr-2 md:pt-60 md:pb-28 md:pl-8 md:pr-4 lg:pl-8 lg:pr-4">
        <div className="container mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-start md:justify-between md:gap-20 lg:gap-24">
          <div className="min-w-0 flex-1 md:max-w-2xl">
            <ScrollReveal y={36} duration={1.4} start="top 85%" fadeOutOnScroll>
              <h2 className="mb-1 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">About Me</h2>
              <div className="mb-6 h-1 w-32 rounded-l-full bg-gradient-to-r from-white/70 via-white/25 to-transparent sm:w-40 md:w-48" aria-hidden />
              <p className="mb-10 text-lg leading-relaxed text-white/80 md:text-xl">
              I&apos;m a developer who loves clean code and great UX. This
              portfolio is built with Next.js, shadcn/ui, and animated components
              from React Bits. You can drop in any React Bits component from{" "}
              <a
                href="https://reactbits.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target text-white underline hover:no-underline"
              >
                reactbits.dev
              </a>{" "}
              — copy the code, install dependencies (e.g. GSAP), and customize to
              fit your style.
            </p>
              <div className="flex flex-wrap gap-x-12 gap-y-6 sm:gap-x-16">
                <div>
                  <p className="text-2xl font-bold text-white md:text-3xl">3+</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/60">Years exp</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white md:text-3xl">5</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/60">Projects</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white md:text-3xl">20+</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/60">Clients</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="ml-auto flex h-[720px] min-h-[720px] w-full shrink-0 flex-col md:ml-8 md:w-[520px] lg:ml-10 lg:w-[560px]">
            <ScrollReveal y={24} duration={1} start="top 85%" fadeOutOnScroll>
              <div
                className="h-[720px] w-full flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-[#252525] to-[#0a0a0a] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),inset_0_-24px_32px_-8px_rgba(0,0,0,0.35)]"
              >
                <Lanyard position={[0, 0, 12]} gravity={[0, -40, 0]} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20">
        <div className="container">
          <ScrollReveal y={36} duration={1.4} start="top 85%" fadeOutOnScroll>
            <h2 className="mb-10 text-2xl font-semibold text-white">Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Project One",
                description: "A Next.js app with shadcn/ui and animations.",
                href: "#",
              },
              {
                title: "Project Two",
                description: "Full-stack project with API and database.",
                href: "#",
              },
              {
                title: "Project Three",
                description: "Open source library or tool you built.",
                href: "#",
              },
            ].map((project) => (
              <article
                key={project.title}
                className="group cursor-target rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <h3 className="mb-2 font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-white/70">
                  {project.description}
                </p>
                <Button variant="link" className="mt-2 cursor-target px-0 text-white hover:text-white/90" asChild>
                  <Link href={project.href}>View project →</Link>
                </Button>
              </article>
            ))}
          </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="contact" className="px-4 py-12 md:px-8 md:py-16">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal y={36} duration={1.4} start="top 85%" fadeOutOnScroll>
            <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-16">
              <div className="flex-1 text-center md:text-left">
                <div
                  className="relative overflow-hidden rounded-2xl p-8 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_60px_-15px_rgba(99,102,241,0.2),0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_0_80px_-10px_rgba(99,102,241,0.4),0_0_120px_-20px_rgba(167,139,246,0.2),0_25px_50px_-12px_rgba(0,0,0,0.5)] md:p-10"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 50%, rgba(59,130,246,0.05) 50%, rgba(139,92,246,0.06) 100%)",
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(125,190,255,0.12),rgba(167,139,246,0.08),transparent)]" aria-hidden />
                  <div className="relative flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10">
                    <div className="flex-1 md:ml-10 lg:ml-16">
                      <h2 className="mb-3 bg-gradient-to-r from-white via-sky-200 to-indigo-200 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                        Get in touch
                      </h2>
                      <p className="mb-8 text-white/70">
                        Have a project in mind? I&apos;d love to hear from you.
                      </p>
                      <a
                        href="mailto:ngoc.holenhu0104@gmail.com"
                        className="group cursor-target mb-8 inline-flex items-center gap-2.5 rounded-xl px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_rgba(99,102,241,0.5)]"
                        style={{
                          background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 40%, #6366f1 70%, #8b5cf6 100%)",
                          boxShadow: "0 0 30px -5px rgba(99,102,241,0.4), 0 4px 14px -2px rgba(0,0,0,0.25)",
                        }}
                      >
                        <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        ngoc.holenhu0104@gmail.com
                      </a>
                      <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                        <a
                          href="https://linkedin.com/in/lisa-ho-a5a917373"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-target rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-white hover:shadow-[0_0_20px_-8px_rgba(99,102,241,0.4)]"
                        >
                          LinkedIn
                        </a>
                        <a
                          href="tel:+61466220942"
                          className="cursor-target rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-white hover:shadow-[0_0_20px_-8px_rgba(99,102,241,0.4)]"
                        >
                          (+61) 466-220-942
                        </a>
                        <a
                          href="https://github.com/LisaHo0104"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-target rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-all duration-200 hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-white hover:shadow-[0_0_20px_-8px_rgba(99,102,241,0.4)]"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                    <div className="relative h-[14rem] w-[18rem] shrink-0 overflow-hidden rounded-3xl sm:h-[16rem] sm:w-[20rem] md:h-[18rem] md:w-[24rem] lg:h-[20rem] lg:w-[28rem]">
                      <img
                        src="/dog_cropped.png"
                        alt=""
                        width={800}
                        height={800}
                        className="h-full w-full object-cover object-[70%_50%]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
