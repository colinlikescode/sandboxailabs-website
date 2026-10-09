"use client";

import dynamic from "next/dynamic";

const AgentOrb = dynamic(() => import("./agent-orb"), {
  ssr: false,
  loading: () => (
    <div className="absolute left-1/2 top-1/2 aspect-square h-[55%] max-h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff_0%,oklch(0.75_0.17_15)_25%,oklch(0.5_0.22_10)_60%,oklch(0.2_0.1_300)_100%)] shadow-[0_0_120px_40px_oklch(0.64_0.23_15/0.45)]" />
  ),
});

export function HeroOrb() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <AgentOrb />
    </div>
  );
}
