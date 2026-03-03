"use client";

import { LogoLoop } from "@/components/LogoLoop";
import { ScrollReveal } from "@/components/ScrollReveal";

// Upper row: frontend / JS ecosystem
const TECH_LOGOS_ROW1 = [
  { name: "React", src: "https://cdn.simpleicons.org/react/ffffff", alt: "React", href: "https://react.dev" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript/ffffff", alt: "TypeScript", href: "https://www.typescriptlang.org" },
  { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/ffffff", alt: "Next.js", href: "https://nextjs.org" },
  { name: "Tailwind CSS", src: "https://cdn.simpleicons.org/tailwindcss/ffffff", alt: "Tailwind CSS", href: "https://tailwindcss.com" },
  { name: "Vite", src: "https://cdn.simpleicons.org/vite/ffffff", alt: "Vite", href: "https://vitejs.dev" },
  { name: "Figma", src: "https://cdn.simpleicons.org/figma/ffffff", alt: "Figma", href: "https://www.figma.com" },
  { name: "HTML5", src: "https://cdn.simpleicons.org/html5/ffffff", alt: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
];

// Lower row: backend / tools / other
const TECH_LOGOS_ROW2 = [
  { name: "Node.js", src: "https://cdn.simpleicons.org/nodedotjs/ffffff", alt: "Node.js", href: "https://nodejs.org" },
  { name: "PHP", src: "https://cdn.simpleicons.org/php/ffffff", alt: "PHP", href: "https://www.php.net" },
  { name: "Python", src: "https://cdn.simpleicons.org/python/ffffff", alt: "Python", href: "https://www.python.org" },
  { name: "PostgreSQL", src: "https://cdn.simpleicons.org/postgresql/ffffff", alt: "PostgreSQL", href: "https://www.postgresql.org" },
  { name: "Supabase", src: "https://cdn.simpleicons.org/supabase/ffffff", alt: "Supabase", href: "https://supabase.com" },
  { name: "Docker", src: "https://cdn.simpleicons.org/docker/ffffff", alt: "Docker", href: "https://www.docker.com" },
  { name: "Git", src: "https://cdn.simpleicons.org/git/ffffff", alt: "Git", href: "https://git-scm.com" },
  { name: "GitHub", src: "https://cdn.simpleicons.org/github/ffffff", alt: "GitHub", href: "https://github.com" },
  { name: "Cursor", src: "https://cdn.simpleicons.org/cursor/ffffff", alt: "Cursor", href: "https://cursor.com" },
  { name: "Linux", src: "https://cdn.simpleicons.org/linux/ffffff", alt: "Linux", href: "https://www.kernel.org" },
  { name: "MongoDB", src: "https://cdn.simpleicons.org/mongodb/ffffff", alt: "MongoDB", href: "https://www.mongodb.com" },
];

export function TechStack() {
  const logosRow1 = TECH_LOGOS_ROW1.map(({ src, alt, href }) => ({ src, alt, href }));
  const logosRow2 = TECH_LOGOS_ROW2.map(({ src, alt, href }) => ({ src, alt, href }));

  return (
    <section
      id="tech-stack"
      className="border-border overflow-hidden pt-36 pb-28 md:pt-44 md:pb-36"
      aria-label="Tech stack"
    >
      <div className="w-full">
        <ScrollReveal y={40} duration={1.5} start="top 85%" fadeOutOnScroll>
          <h2 className="mb-2 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Tech Stack
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-white/80 md:mb-20 md:text-xl">
            Tools and technologies I use to design, build, and deploy scalable
            applications and solve real-world problems.
          </p>
        </ScrollReveal>
          <div className="flex w-full flex-col gap-6">
          <ScrollReveal y={28} duration={1.6} delay={0.2} start="top 88%" fadeOutOnScroll>
          <div className="w-full">
            <LogoLoop
              logos={logosRow1}
              direction="left"
              speed={80}
              logoHeight={88}
              gap={100}
              ariaLabel="Technologies row 1"
              className="w-full text-white/90"
              fadeOut
              fadeOutColor="#0b0b0b"
            />
          </div>
          </ScrollReveal>
          <ScrollReveal y={28} duration={1.6} delay={0.35} start="top 88%" fadeOutOnScroll>
          <div className="w-full">
            <LogoLoop
              logos={logosRow2}
              direction="right"
              speed={80}
              logoHeight={88}
              gap={100}
              ariaLabel="Technologies row 2"
              className="w-full text-white/90"
              fadeOut
              fadeOutColor="#0b0b0b"
            />
          </div>
          </ScrollReveal>
          </div>
      </div>
    </section>
  );
}
