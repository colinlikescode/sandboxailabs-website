import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is Ava a real person?", a: "No. Ava is an AI agent built by Sandbox AI Labs. For edge cases, Ava can escalate to a vetted human assistant." },
  { q: "What can Ava actually do on my behalf?", a: "Send and reply to email, schedule and reschedule meetings, book travel and restaurants, file expenses, research people and companies, and coordinate with other people's assistants — within the limits you set." },
  { q: "How does Ava learn my preferences?", a: "From a short intro call, your past emails and calendar patterns, and every correction you make. Preferences are stored in a private memory you can view and edit." },
  { q: "Will Ava spend money without asking?", a: "Only up to the spend cap you choose. Anything above it — or anything you mark as sensitive — requires a one-tap approval." },
  { q: "Which tools does it work with?", a: "Gmail, Google Workspace, Outlook, Slack, Zoom, Notion, Linear, Amex, Ramp, Brex, Expensify, OpenTable, Resy, and every major airline and hotel group." },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto w-full max-w-3xl px-6 py-28">
      <h2 className="text-center text-4xl font-semibold tracking-tight">Questions, answered.</h2>
      <Accordion className="mt-12">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q} className="border-b py-2">
            <AccordionTrigger className="py-4 text-base hover:no-underline">{f.q}</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
