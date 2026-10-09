import { KeyRound, Lock, ShieldCheck, Sparkles, UserCheck, Workflow } from "lucide-react";

const steps = [
  { icon: KeyRound, title: "Connect", body: "Link Gmail, Calendar, Slack, and cards in 90 seconds. Scoped, revocable access." },
  { icon: Sparkles, title: "Brief", body: "Ava learns your voice, priorities, and preferences from a 10-minute intro call." },
  { icon: Workflow, title: "Delegate", body: "Hand off anything by text, voice, or email. Ava acts — and checks in when it matters." },
];

const trust = [
  { icon: Lock, title: "Bank-grade encryption", body: "AES-256 at rest, TLS 1.3 in transit. SOC 2 Type II." },
  { icon: UserCheck, title: "You set the limits", body: "Spend caps, approval rules, and people Ava never contacts." },
  { icon: ShieldCheck, title: "Your data stays yours", body: "Never used to train models. Export or delete anytime." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-28">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-sm font-semibold text-brand">How it works</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Onboarded before your coffee cools.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            No setup consultants. No prompt engineering. Ava starts helping on day one and gets sharper every week.
          </p>
        </div>
        <ol className="grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-3xl border p-6 transition-shadow hover:shadow-xl">
              <span className="text-xs font-semibold text-muted-foreground">0{i + 1}</span>
              <s.icon className="mt-6 size-7 text-brand" strokeWidth={1.5} />
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-24 grid gap-10 rounded-[2rem] bg-neutral-950 p-10 text-white sm:grid-cols-3 sm:p-14">
        {trust.map((t) => (
          <div key={t.title}>
            <t.icon className="size-6 text-brand" strokeWidth={1.5} />
            <h3 className="mt-4 font-semibold">{t.title}</h3>
            <p className="mt-2 text-sm text-white/60">{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
