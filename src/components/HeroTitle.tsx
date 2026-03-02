"use client";

/**
 * Hero title with staggered character animation.
 * React Bits style: you can replace this with any component from
 * https://reactbits.dev — e.g. Split Text (requires GSAP).
 * This version uses CSS only for a lightweight intro animation.
 */
export function HeroTitle() {
  const text = "Hi, I'm your name.";
  return (
    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block animate-fade-in-up"
          style={{
            animationDelay: `${i * 50}ms`,
            animationFillMode: "backwards",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}
