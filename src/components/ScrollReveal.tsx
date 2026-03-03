"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children?: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
  /** When true, content fades in when scrolling to it and fades out when scrolling past it */
  fadeOutOnScroll?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 32,
  duration = 1.4,
  start = "top 88%",
  fadeOutOnScroll = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (fadeOutOnScroll) {
      gsap.set(el, { opacity: 0, y });
      const fadeInEnd = 0.35;   // fade in over first 35% of scroll range
      const fadeOutStart = 0.65; // fade out over last 35% of scroll range
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          let opacity: number;
          let yVal: number;
          if (p <= fadeInEnd) {
            const t = p / fadeInEnd;
            const eased = 1 - (1 - t) * (1 - t); // ease out: slow start, smooth finish
            opacity = eased;
            yVal = typeof y === "number" ? y * (1 - eased) : 0;
          } else if (p >= fadeOutStart) {
            const t = (1 - p) / (1 - fadeOutStart);
            const eased = 1 - (1 - t) * (1 - t);
            opacity = eased;
            yVal = 0;
          } else {
            opacity = 1;
            yVal = 0;
          }
          gsap.set(el, { opacity, y: yVal });
        },
      });
      return () => trigger.kill();
    }

    const animation = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [y, duration, delay, start, fadeOutOnScroll]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
