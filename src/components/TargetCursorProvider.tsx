"use client";

import dynamic from "next/dynamic";

const TargetCursor = dynamic(
  () => import("@/components/TargetCursor").then((m) => m.default),
  { ssr: false }
);

export function TargetCursorProvider() {
  return (
    <TargetCursor
      targetSelector=".cursor-target"
      spinDuration={2}
      hideDefaultCursor={true}
      hoverDuration={0.2}
      parallaxOn={true}
    />
  );
}
