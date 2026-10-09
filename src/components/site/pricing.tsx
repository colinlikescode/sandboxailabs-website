import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Personal",
    price: 49,
    desc: "For founders and operators doing it all.",
    features: ["Ava, your executive assistant", "Inbox + calendar management", "Travel & reservations", "Text, voice, and email"],
  },
  {
    name: "Executive",
    price: 199,
    desc: "For leaders whose time is the bottleneck.",
    features: ["Everything in Personal", "All 7 specialist agents", "Meeting prep briefs", "Expense reconciliation", "Priority human escalation"],
    featured: true,
  },
  {
    name: "Office",
    price: 799,
    desc: "For exec teams and family offices.",
    features: ["Everything in Executive", "Nova, Chief of Staff agent", "Up to 10 principals", "SSO, audit logs, custom policies", "Dedicated success lead"],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto w-full max-w-7xl px-6 py-28">
      <div className="text-center">
        <p className="text-sm font-semibold text-brand">Pricing</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          Less than one hour of your time.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Every plan includes a 14-day free trial. No contracts, cancel in one tap.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={cn(
              "relative flex flex-col rounded-3xl border p-8",
              t.featured && "border-transparent bg-black text-white shadow-2xl lg:-translate-y-4"
            )}
          >
            {t.featured && (
              <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
            )}
            <h3 className="text-lg font-semibold">{t.name}</h3>
            <p className={cn("mt-1 text-sm", t.featured ? "text-white/60" : "text-muted-foreground")}>{t.desc}</p>
            <p className="mt-8 text-5xl font-semibold tracking-tight">
              ${t.price}
              <span className={cn("text-base font-normal", t.featured ? "text-white/60" : "text-muted-foreground")}>
                {" "}/ month
              </span>
            </p>
            <ul className="mt-8 flex-1 space-y-3 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <Check className={cn("size-4 shrink-0", t.featured ? "text-brand" : "text-foreground")} />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#reserve"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-10 h-12 rounded-xl text-sm",
                t.featured ? "bg-brand text-white hover:bg-brand/90" : "bg-black text-white hover:bg-black/85"
              )}
            >
              Start free trial
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
