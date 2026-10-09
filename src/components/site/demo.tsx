"use client";

import { Check, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Msg = { from: "you" | "ava"; text: string; actions?: string[] };

const scenarios: { id: string; label: string; messages: Msg[] }[] = [
  {
    id: "offsite",
    label: "Plan an offsite",
    messages: [
      { from: "you", text: "Plan a 2-day leadership offsite in Napa for 8 people, sometime in November." },
      { from: "ava", text: "On it. Nov 12–13 works for all 8 calendars. I shortlisted 3 venues under $40k.", actions: ["Checked 8 calendars", "Held Nov 12–13", "Requested 3 venue quotes"] },
      { from: "you", text: "Go with Auberge. Add a wine tasting." },
      { from: "ava", text: "Booked Auberge du Soleil + private tasting at Stag's Leap. Invites, agenda, and car service sent.", actions: ["Contract signed via DocuSign", "Invites sent", "Budget: $36,420"] },
    ],
  },
  {
    id: "inbox",
    label: "Morning brief",
    messages: [
      { from: "you", text: "What do I need to know this morning?" },
      { from: "ava", text: "3 things: Sarah needs sign-off on the board deck by noon, Acme moved their renewal call to 2 PM, and your flight tomorrow is upgraded.", actions: ["Triaged 142 emails", "Drafted 11 replies", "Archived 96"] },
      { from: "you", text: "Approve the deck and tell Acme 2 PM is fine." },
      { from: "ava", text: "Done. Approved and replied to Sarah. Confirmed with Acme and attached last quarter's usage report.", actions: ["Replied in your voice", "Calendar updated"] },
    ],
  },
  {
    id: "gift",
    label: "Personal errands",
    messages: [
      { from: "you", text: "It's my parents' 40th anniversary on Saturday. Handle it." },
      { from: "ava", text: "Ordered flowers from their favorite florist for Saturday 10 AM, and booked dinner at The French Laundry at 7.", actions: ["Flowers ordered · $180", "Dinner for 4 confirmed"] },
      { from: "you", text: "Perfect. Card too?" },
      { from: "ava", text: "Handwritten-style card drafted from your past notes. Want to review before it ships?", actions: ["Draft ready for review"] },
    ],
  },
];

export function Demo() {
  return (
    <section id="demo" className="bg-neutral-50 py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-brand">Live demo</p>
          <h2 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Just say what you want.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Ava plans, acts across your tools, and reports back. You approve only what matters.
          </p>
        </div>

        <Tabs defaultValue="offsite" className="mt-12 items-center">
          <TabsList className="h-11 max-w-full justify-start overflow-x-auto rounded-full bg-white p-1 shadow-sm ring-1 ring-border [scrollbar-width:none]">
            {scenarios.map((s) => (
              <TabsTrigger
                key={s.id}
                value={s.id}
                className="flex-none rounded-full px-3 sm:px-4 data-active:bg-black data-active:text-white"
              >
                {s.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {scenarios.map((s) => (
            <TabsContent key={s.id} value={s.id} className="mt-8 w-full">
              <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
                <div className="flex items-center gap-3 border-b px-5 py-4">
                  <div className="size-8 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,oklch(0.7_0.2_15)_35%,oklch(0.45_0.2_10))]" />
                  <div>
                    <p className="text-sm font-semibold">Ava</p>
                    <p className="flex items-center gap-1 text-xs text-emerald-600">
                      <span className="size-1.5 rounded-full bg-emerald-500" /> Working
                    </p>
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  {s.messages.map((m, i) => (
                    <div
                      key={i}
                      style={{ animationDelay: `${i * 0.7}s` }}
                      className={cn("flex animate-fade-up", m.from === "you" ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                          m.from === "you" ? "rounded-br-sm bg-black text-white" : "rounded-bl-sm bg-neutral-100"
                        )}
                      >
                        {m.from === "ava" && (
                          <Sparkles className="mb-1 size-3.5 text-brand" />
                        )}
                        {m.text}
                        {m.actions && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {m.actions.map((a) => (
                              <span
                                key={a}
                                className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-700 ring-1 ring-border"
                              >
                                <Check className="size-3 text-emerald-600" /> {a}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
