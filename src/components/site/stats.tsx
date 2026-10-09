const stats = [
  { value: "11.4", unit: "hrs", label: "Reclaimed per week" },
  { value: "<2", unit: "s", label: "Median response time" },
  { value: "98", unit: "%", label: "Tasks done without escalation" },
  { value: "24/7", unit: "", label: "Always on, never off-sick" },
];

const logos = ["Sequoia", "Stripe", "Ramp", "Figma", "Linear", "Notion", "Vercel", "Anduril", "Brex", "Scale"];

export function Stats() {
  return (
    <section id="stats" className="bg-black pb-20 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 border-t border-white/10 px-6 pt-14 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {s.value}
              <span className="ml-1 text-2xl text-white/60">{s.unit}</span>
            </p>
            <p className="mt-2 text-sm text-white/50">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-white/40">
          Trusted by operators at
        </p>
        <div className="flex w-max animate-marquee gap-16">
          {[...logos, ...logos].map((l, i) => (
            <span key={i} className="text-2xl font-semibold tracking-tight text-white/30">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
