import { Check, Clock, Mail, Plane, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

function InboxMock() {
  const rows = [
    { from: "Sarah Chen", subject: "Q3 board deck — final review", tag: "Needs you", tone: "bg-brand text-white" },
    { from: "Delta", subject: "Your upgrade is confirmed", tag: "Filed", tone: "bg-white/10 text-white/70" },
    { from: "Marcus (Sequoia)", subject: "Coffee next week?", tag: "Replied", tone: "bg-emerald-500/20 text-emerald-300" },
    { from: "Legal", subject: "NDA redlines v3", tag: "Summarized", tone: "bg-sky-500/20 text-sky-300" },
    { from: "Newsletter", subject: "This week in AI", tag: "Archived", tone: "bg-white/10 text-white/50" },
  ];
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
      {rows.map((r) => (
        <div key={r.subject} className="flex items-center gap-3 rounded-2xl px-3 py-3 hover:bg-white/5">
          <div className="grid size-9 place-items-center rounded-full bg-white/10 text-xs font-semibold">
            {r.from[0]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{r.from}</p>
            <p className="truncate text-xs text-white/50">{r.subject}</p>
          </div>
          <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", r.tone)}>{r.tag}</span>
        </div>
      ))}
    </div>
  );
}

function CalendarMock() {
  const blocks = [
    { time: "8:00", title: "Deep work — strategy memo", h: "h-20", tone: "bg-indigo-500/80", lock: true },
    { time: "10:00", title: "1:1 with Priya", h: "h-10", tone: "bg-white/15" },
    { time: "11:00", title: "Investor call · prep brief attached", h: "h-14", tone: "bg-brand/90" },
    { time: "12:30", title: "Lunch (protected)", h: "h-10", tone: "bg-emerald-500/70", lock: true },
    { time: "2:00", title: "Product review", h: "h-14", tone: "bg-white/15" },
  ];
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="font-semibold">Thursday, Oct 15</span>
        <span className="flex items-center gap-1 text-xs text-white/60">
          <Shield className="size-3.5" /> 3 conflicts resolved
        </span>
      </div>
      <div className="space-y-2">
        {blocks.map((b) => (
          <div key={b.title} className="flex gap-3">
            <span className="w-10 pt-1 text-right text-[11px] text-white/40">{b.time}</span>
            <div className={cn("flex flex-1 items-start justify-between rounded-xl px-3 py-2 text-xs font-medium", b.h, b.tone)}>
              {b.title}
              {b.lock && <Clock className="size-3.5 opacity-70" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TravelMock() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between text-xs text-white/50">
          <span>DL 420 · Delta One</span>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300">Upgraded</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-3xl font-semibold">SFO</p>
            <p className="text-xs text-white/50">7:05 AM</p>
          </div>
          <div className="flex flex-1 items-center gap-2 px-4">
            <div className="h-px flex-1 bg-white/20" />
            <Plane className="size-4" />
            <div className="h-px flex-1 bg-white/20" />
          </div>
          <div className="text-right">
            <p className="text-3xl font-semibold">JFK</p>
            <p className="text-xs text-white/50">3:41 PM</p>
          </div>
        </div>
      </div>
      {["Car to SFO booked — 5:30 AM", "The Greenwich Hotel · 2 nights", "Dinner at Carbone · 8:00 PM, party of 4"].map((t) => (
        <div key={t} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur-xl">
          <span className="grid size-6 place-items-center rounded-full bg-emerald-500/20">
            <Check className="size-3.5 text-emerald-300" />
          </span>
          {t}
        </div>
      ))}
    </div>
  );
}

const panels = [
  {
    eyebrow: "Inbox",
    icon: Mail,
    title: "Inbox, handled.",
    body: "Ava reads everything, replies in your voice, and only surfaces what truly needs you. Most executives go from 300 emails to 6.",
    bg: "bg-[radial-gradient(ellipse_at_15%_50%,oklch(0.35_0.12_15),black_60%)]",
    mock: <InboxMock />,
  },
  {
    eyebrow: "Calendar",
    icon: Clock,
    title: "Calendar, defended.",
    body: "Negotiates meeting times across time zones, protects focus blocks, and drops a prep brief in every invite.",
    bg: "bg-[radial-gradient(ellipse_at_85%_50%,oklch(0.35_0.15_280),black_60%)]",
    mock: <CalendarMock />,
  },
  {
    eyebrow: "Travel",
    icon: Plane,
    title: "Travel, booked.",
    body: "Flights, hotels, cars, and dinner reservations — rebooked automatically when plans change. You just show up.",
    bg: "bg-[radial-gradient(ellipse_at_15%_50%,oklch(0.35_0.1_200),black_60%)]",
    mock: <TravelMock />,
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="bg-black text-white">
      {panels.map((p, i) => (
        <div key={p.title} className={cn("relative flex min-h-[85svh] items-center overflow-hidden", p.bg)}>
          <div
            className={cn(
              "mx-auto grid w-full max-w-7xl items-center gap-16 px-6 py-28 lg:grid-cols-2",
              i % 2 === 1 && "lg:[&>*:first-child]:order-2"
            )}
          >
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-white/60">
                <p.icon className="size-4" /> {p.eyebrow}
              </p>
              <h2 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">{p.title}</h2>
              <p className="mt-6 max-w-md text-lg text-white/60">{p.body}</p>
              <a href="#demo" className="mt-8 inline-block text-sm font-medium underline underline-offset-8 hover:text-brand">
                See it in action
              </a>
            </div>
            <div className="flex justify-center lg:justify-end">{p.mock}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
