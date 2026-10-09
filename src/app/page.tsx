import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Agents } from "@/components/site/agents";
import { Capabilities } from "@/components/site/capabilities";
import { Demo } from "@/components/site/demo";
import { HowItWorks } from "@/components/site/how-it-works";
import { Faq } from "@/components/site/faq";
import { Reserve } from "@/components/site/reserve";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Agents />
        <Capabilities />
        <Demo />
        <HowItWorks />
        <Faq />
        <Reserve />
      </main>
      <Footer />
    </>
  );
}
