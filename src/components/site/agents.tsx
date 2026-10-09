"use client";

import { useState } from "react";
import {
  Briefcase,
  CalendarDays,
  Heart,
  Inbox,
  LayoutGrid,
  Plane,
  Receipt,
  Search,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const categories: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "all", label: "All agents", icon: LayoutGrid },
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "finance", label: "Expenses", icon: Receipt },
  { id: "research", label: "Research", icon: Search },
  { id: "people", label: "Relationships", icon: Users },
  { id: "ops", label: "Chief of Staff", icon: Briefcase },
];

type Agent = {
  name: string;
  role: string;
  category: string;
  rating: number;
  reviews: number;
  price: number;
  tagline: string;
  gradient: string;
  badge?: string;
  initials: string;
};

const agents: Agent[] = [
  { name: "Ava", role: "Executive Assistant", category: "ops", rating: 4.98, reviews: 2841, price: 49, tagline: "Runs your day end-to-end", gradient: "from-rose-500 via-fuchsia-500 to-indigo-600", badge: "Guest favorite", initials: "AV" },
  { name: "Milo", role: "Inbox Concierge", category: "inbox", rating: 4.95, reviews: 1920, price: 19, tagline: "Inbox zero by 9 AM, daily", gradient: "from-amber-400 via-orange-500 to-rose-500", initials: "MI" },
  { name: "Juno", role: "Calendar Guardian", category: "calendar", rating: 4.97, reviews: 1533, price: 19, tagline: "Defends your deep-work blocks", gradient: "from-emerald-400 via-teal-500 to-sky-600", badge: "New", initials: "JU" },
  { name: "Atlas", role: "Travel Desk", category: "travel", rating: 4.96, reviews: 988, price: 29, tagline: "Books, rebooks, upgrades", gradient: "from-sky-400 via-blue-600 to-violet-700", initials: "AT" },
  { name: "Penny", role: "Expense Closer", category: "finance", rating: 4.93, reviews: 712, price: 15, tagline: "Receipts matched, reports filed", gradient: "from-lime-300 via-emerald-500 to-teal-700", initials: "PE" },
  { name: "Sage", role: "Research Analyst", category: "research", rating: 4.94, reviews: 640, price: 39, tagline: "Briefs before every meeting", gradient: "from-violet-400 via-purple-600 to-slate-900", initials: "SA" },
  { name: "Remy", role: "Relationship Keeper", category: "people", rating: 4.92, reviews: 455, price: 15, tagline: "Never miss a follow-up or birthday", gradient: "from-pink-300 via-rose-400 to-orange-400", initials: "RE" },
  { name: "Nova", role: "Chief of Staff", category: "ops", rating: 4.99, reviews: 302, price: 99, tagline: "Coordinates your whole team", gradient: "from-zinc-200 via-zinc-500 to-zinc-900", badge: "Superagent", initials: "NO" },
];

export function Agents() {
  const [category, setCategory] = useState("all");
  const [liked, setLiked] = useState<Set<string>>(new Set(["Ava"]));

  const visible = category === "all" ? agents : agents.filter((a) => a.category === category);

  const toggle = (name: string) =>
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <section id="agents" className="mx-auto w-full max-w-7xl px-6 py-24">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold text-brand">The agent marketplace</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Hire an assistant in minutes.
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Every agent is trained for one job, then works with the others as a team. Mix and match — cancel anytime.
        </p>
      </div>

      <div className="sticky top-16 z-30 -mx-6 mb-10 border-b bg-background/90 px-6 backdrop-blur-xl">
        <div className="flex gap-8 overflow-x-auto [scrollbar-width:none]">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCategory(id)}
              className={cn(
                "flex shrink-0 flex-col items-center gap-2 border-b-2 pb-3 pt-4 text-xs font-medium transition-colors",
                category === id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              <Icon className="size-6" strokeWidth={1.5} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((a) => (
          <article key={a.name} className="group animate-fade-up cursor-pointer">
            <div
              className={cn(
                "relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br",
                a.gradient
              )}
            >
              <div className="grain absolute inset-0 opacity-20 mix-blend-overlay" />
              <div className="absolute inset-0 grid place-items-center transition-transform duration-700 group-hover:scale-110">
                <div className="grid size-28 place-items-center rounded-full border border-white/30 bg-white/15 text-3xl font-semibold tracking-tight text-white shadow-2xl backdrop-blur-md">
                  {a.initials}
                </div>
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-xl bg-black/25 px-3 py-2 text-xs text-white backdrop-blur-md">
                “{a.tagline}”
              </div>
              {a.badge && (
                <Badge className="absolute left-3 top-3 h-6 rounded-full bg-white px-3 text-xs font-semibold text-black shadow">
                  {a.badge}
                </Badge>
              )}
              <button
                aria-label={`Save ${a.name}`}
                onClick={() => toggle(a.name)}
                className="absolute right-3 top-3 transition-transform active:scale-90"
              >
                <Heart
                  className={cn(
                    "size-6 stroke-white stroke-2 drop-shadow",
                    liked.has(a.name) ? "fill-brand" : "fill-black/40"
                  )}
                />
              </button>
            </div>
            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">
                  {a.name} · <span className="font-normal">{a.role}</span>
                </h3>
                <p className="text-sm text-muted-foreground">{a.reviews.toLocaleString()} executives served</p>
              </div>
              <p className="flex shrink-0 items-center gap-1 text-sm">
                <Star className="size-3.5 fill-foreground" />
                {a.rating.toFixed(2)}
              </p>
            </div>
            <p className="mt-1 text-sm">
              <span className="font-semibold">${a.price}</span> / month
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
