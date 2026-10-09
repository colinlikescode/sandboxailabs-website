import { Separator } from "@/components/ui/separator";
import { Logo } from "./logo";

const columns = [
  { title: "Product", links: ["Ava", "Specialist agents", "Integrations", "Security", "Changelog"] },
  { title: "Company", links: ["About Sandbox AI Labs", "Careers", "Research", "Press", "Contact"] },
  { title: "Support", links: ["Help center", "Trust & safety", "Status", "Accessibility", "Report a concern"] },
];

export function Footer() {
  return (
    <footer className="bg-neutral-100 text-sm">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-muted-foreground">
              Building personal agents that give people their time back.
            </p>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <h4 className="font-semibold">{c.title}</h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-muted-foreground hover:text-foreground hover:underline">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col justify-between gap-4 text-muted-foreground md:flex-row">
          <p>© 2026 Sandbox AI Labs, Inc. · Privacy · Terms · Sitemap</p>
        </div>
      </div>
    </footer>
  );
}
