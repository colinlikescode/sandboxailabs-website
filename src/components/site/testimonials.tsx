import { Sprout, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  { name: "Elena Park", title: "CEO, Lumen Health", date: "September 2026", text: "I fired my second inbox. Ava handles 90% of my email and every scheduling thread. I got my evenings back." },
  { name: "David Okafor", title: "GP, Northline Ventures", date: "August 2026", text: "It booked a 4-city roadshow in 20 minutes, then rebooked everything when a flight got cancelled — before I even noticed." },
  { name: "Maya Lindqvist", title: "COO, Arcfield", date: "September 2026", text: "The meeting briefs alone are worth it. I walk into every call knowing exactly who I'm talking to and what they want." },
  { name: "James Whitfield", title: "Founder, Tern", date: "July 2026", text: "It writes like me. My team genuinely can't tell which replies are mine. That's either amazing or terrifying." },
  { name: "Priya Raman", title: "VP Eng, Meridian", date: "October 2026", text: "Juno defends my focus time like a bouncer. My maker hours went from 6 to 19 a week." },
  { name: "Tom Becker", title: "Partner, Hale & Co.", date: "August 2026", text: "Expenses used to eat my Sunday. Now they're filed before I land. Simple as that." },
];

export function Testimonials() {
  return (
    <section className="border-y bg-white py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 text-6xl font-semibold tracking-tight">
            <Sprout className="size-10 -rotate-12" strokeWidth={1.5} />4.97
            <Sprout className="size-10 -scale-x-100 rotate-12" strokeWidth={1.5} />
          </div>
          <h2 className="mt-3 text-2xl font-semibold">Executive favorite</h2>
          <p className="mt-2 max-w-sm text-muted-foreground">
            One of the most-loved assistants on Sandbox, based on ratings, reviews, and reliability.
          </p>
        </div>

        <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {reviews.map((r) => (
            <figure key={r.name}>
              <div className="flex items-center gap-4">
                <Avatar className="size-12">
                  <AvatarFallback className="bg-neutral-900 text-sm font-semibold text-white">
                    {r.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-muted-foreground">{r.title}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-foreground" />
                  ))}
                </span>
                <span className="font-semibold">· {r.date}</span>
              </div>
              <blockquote className="mt-2 leading-relaxed">{r.text}</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
