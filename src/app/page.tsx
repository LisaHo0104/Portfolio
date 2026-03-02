import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="about" className="border-border border-t py-20">
        <div className="container max-w-2xl">
          <h2 className="mb-6 text-2xl font-semibold text-white">About</h2>
          <p className="leading-relaxed text-white/80">
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
        </div>
      </section>

      <section id="projects" className="border-border border-t py-20">
        <div className="container">
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
        </div>
      </section>

      <section id="contact" className="border-border border-t py-20">
        <div className="container max-w-xl text-center">
          <h2 className="mb-4 text-2xl font-semibold text-white">Get in touch</h2>
          <p className="mb-8 text-white/80">
            Have a project in mind? I&apos;d love to hear from you.
          </p>
          <Button size="lg" className="cursor-target bg-white text-black hover:bg-white/90" asChild>
            <a href="mailto:hello@example.com">hello@example.com</a>
          </Button>
        </div>
      </section>
    </>
  );
}
