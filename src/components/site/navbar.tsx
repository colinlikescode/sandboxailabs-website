"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#agents", label: "Agents" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#demo", label: "Demo" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-white/80 text-foreground shadow-[0_1px_0_0_var(--border)] backdrop-blur-xl"
          : "bg-transparent text-white"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 text-[15px] font-semibold tracking-[0.35em]">
          <span className="grid size-7 place-items-center rounded-full bg-brand text-[11px] tracking-normal text-white">
            S
          </span>
          SANDBOX
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  solid ? "hover:bg-black/5" : "hover:bg-white/10"
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href="#"
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              solid ? "hover:bg-black/5" : "hover:bg-white/10"
            )}
          >
            Sign in
          </a>
          <a
            href="#reserve"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-9 rounded-full bg-brand px-5 text-white hover:bg-brand/90"
            )}
          >
            Reserve
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="rounded-md p-2 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 border-t px-6 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 text-base font-medium hover:bg-black/5"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
