"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const segments = [
  { id: "task", label: "Delegate", placeholder: "Reschedule my week around the offsite" },
  { id: "when", label: "When", placeholder: "Before Friday" },
  { id: "access", label: "Access", placeholder: "Gmail, Calendar, Amex" },
] as const;

export function DelegateBar() {
  const [active, setActive] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 2400);
      }}
      className={cn(
        "flex w-full max-w-3xl items-center rounded-full border border-white/15 bg-white p-2 text-black shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-colors",
        active && "bg-neutral-100"
      )}
    >
      {segments.map((s, i) => (
        <label
          key={s.id}
          className={cn(
            "group relative flex min-w-0 cursor-text flex-col rounded-full px-6 py-2.5 transition-all",
            i === 0 ? "flex-[1.6]" : "hidden flex-1 sm:flex",
            active === s.id ? "bg-white shadow-lg" : "hover:bg-neutral-200/70"
          )}
        >
          <span className="text-xs font-semibold">{s.label}</span>
          <input
            value={values[s.id] ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, [s.id]: e.target.value }))}
            onFocus={() => setActive(s.id)}
            onBlur={() => setActive(null)}
            placeholder={s.placeholder}
            className="w-full truncate bg-transparent text-sm text-neutral-800 outline-none placeholder:text-neutral-500"
          />
          {i < segments.length - 1 && (
            <span className="absolute right-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-neutral-200 group-hover:opacity-0 sm:block" />
          )}
        </label>
      ))}
      <button
        type="submit"
        className={cn(
          "ml-1 flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-brand text-white transition-all hover:brightness-110",
          active || sent ? "px-5" : "w-12"
        )}
      >
        <Search className="size-4" strokeWidth={3} />
        {(active || sent) && (
          <span className="text-sm font-semibold">{sent ? "Ava's on it" : "Hand off"}</span>
        )}
      </button>
    </form>
  );
}
