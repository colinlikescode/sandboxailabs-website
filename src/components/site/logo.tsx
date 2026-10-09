import { useId } from "react";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 32 32" className={cn("size-7", className)} aria-hidden>
      <defs>
        <linearGradient id={`${id}-bg`} x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF5A7A" />
          <stop offset="0.55" stopColor="#E11D48" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <radialGradient id={`${id}-hl`} cx="10" cy="8" r="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${id}-bg)`} />
      <rect width="32" height="32" rx="9" fill={`url(#${id}-hl)`} />
      <path
        d="M21 11.5A5 4.5 0 1 0 16 16a5 4.5 0 1 1-5 4.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="22.5" cy="8.5" r="1.6" fill="#fff" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-[0.32em]">SANDBOX</span>
    </span>
  );
}
