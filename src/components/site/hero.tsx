import { CalendarCheck, Mail, Plane, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DelegateBar } from "./delegate-bar";
import { HeroOrb } from "./hero-orb";

const floating = [
  {
    icon: Mail,
    title: "Inbox cleared",
    body: "142 emails triaged · 6 need you",
    className: "left-[4%] top-[28%] [animation-delay:0s]",
  },
  {
    icon: CalendarCheck,
    title: "Board prep moved",
    body: "Thu 9:00 → Fri 8:30, all confirmed",
    className: "right-[5%] top-[22%] [animation-delay:1.5s]",
  },
  {
    icon: Plane,
    title: "SFO → JFK booked",
    body: "Aisle, 7:05 AM, Delta One · $612",
    className: "left-[3%] bottom-[34%] [animation-delay:3s]",
  },
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col items-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[55%] size-[90vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.64_0.23_15/0.45),transparent_55%)] blur-3xl" />
        <div className="absolute left-[15%] top-[10%] size-[40vmax] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_290/0.35),transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[-20%] right-[5%] size-[45vmax] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.15_60/0.25),transparent_60%)] blur-3xl" />
        <div className="grain absolute inset-0 opacity-[0.08] mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      <HeroOrb />

      {floating.map(({ icon: Icon, title, body, className }) => (
        <div
          key={title}
          className={cn(
            "absolute hidden w-64 animate-float rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl lg:block",
            className
          )}
        >
          <div className="flex items-start gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10">
              <Icon className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="mt-0.5 text-xs text-white/60">{body}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-[18vh] flex animate-fade-up flex-col items-center px-6 text-center">
        <p className="mb-5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80 backdrop-blur">
          <span className="mr-2 inline-block size-1.5 rounded-full bg-emerald-400 align-middle" />
          Waitlist now open
        </p>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">Meet Ava.</h1>
        <p className="mt-4 max-w-xl text-lg text-white/70 sm:text-xl">
          A personal executive assistant agent that runs your inbox, calendar,
          and life logistics, so you can run everything else.
        </p>
      </div>

      <div className="mt-auto flex w-full flex-col items-center gap-8 px-6 pb-14">
        <DelegateBar />
        <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <a
            href="#reserve"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 w-full rounded-md sm:w-auto sm:flex-1 bg-white text-sm text-black hover:bg-white/90"
            )}
          >
            Join the waitlist
          </a>
          <a
            href="#demo"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 w-full rounded-md sm:w-auto sm:flex-1 bg-white/10 text-sm text-white backdrop-blur hover:bg-white/20"
            )}
          >
            Watch it work
          </a>
        </div>
        <a href="#stats" aria-label="Scroll down" className="text-white/50 hover:text-white">
          <ChevronDown className="size-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
