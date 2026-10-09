"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Reserve() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="reserve" className="relative isolate overflow-hidden bg-black px-6 py-36 text-center text-white">
      <div className="absolute left-1/2 top-full -z-10 size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.64_0.23_15/0.55),transparent_60%)] blur-2xl" />
      <h2 className="mx-auto max-w-3xl text-5xl font-semibold tracking-tight sm:text-7xl">
        Get your time back.
      </h2>
      <p className="mx-auto mt-6 max-w-md text-lg text-white/60">
        Reserve Ava today. Onboarding opens in waves.
      </p>

      {done ? (
        <p className="mx-auto mt-10 flex w-fit items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm backdrop-blur">
          <Check className="size-4 text-emerald-400" /> You&apos;re on the list. Ava will email you shortly.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setDone(true);
          }}
          className="mx-auto mt-10 flex max-w-md gap-2 rounded-full bg-white p-1.5"
        >
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="h-11 border-0 bg-transparent pl-5 text-black shadow-none focus-visible:ring-0"
          />
          <Button type="submit" className="h-11 shrink-0 rounded-full bg-brand px-6 text-white hover:bg-brand/90">
            Reserve <ArrowRight className="size-4" />
          </Button>
        </form>
      )}
    </section>
  );
}
