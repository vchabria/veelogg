import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Users, Briefcase, ArrowRight } from "lucide-react";

export default function VeeloggHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <span className="text-lg font-display bg-gradient-to-r from-copper to-butter bg-clip-text text-transparent">
            Veelogg
          </span>
          <nav className="flex items-center gap-4">
            <a
              href="https://tools.veelogg.com"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Tools
            </a>
            <a
              href="https://tools.veelogg.com/pricing"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container flex flex-col items-center justify-center py-28 text-center">
        <h1 className="max-w-3xl text-5xl font-display tracking-tight sm:text-6xl">
          The creative AI studio for{" "}
          <span className="bg-gradient-to-r from-copper to-butter bg-clip-text text-transparent">
            creators who build
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          AI-powered tools, brand services, and a creator community.
          Everything you need to turn content into a business.
        </p>
        <div className="mt-10 flex gap-4">
          <Button size="lg" asChild>
            <a href="https://tools.veelogg.com">
              Try the Toolkit <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#three-doors">Learn More</a>
          </Button>
        </div>
      </section>

      {/* Wave divider */}
      <div className="wave-divider" />

      {/* Three Doors */}
      <section id="three-doors" className="bg-nebula/30 py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-display mb-14">Three ways in</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-butter/40 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-copper" />
                </div>
                <h3 className="text-xl font-display">For Brands</h3>
                <p className="text-sm text-muted-foreground">
                  Find creators, analyze campaigns, and generate outreach
                  with AI-powered brand intelligence.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-copper border-2">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-butter/40 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-copper" />
                </div>
                <h3 className="text-xl font-display">For Creators</h3>
                <p className="text-sm text-muted-foreground">
                  Generate hooks, write scripts, repurpose content, and pitch
                  brands — all from one toolkit.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-8 pb-8 space-y-4">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-butter/40 flex items-center justify-center">
                  <Users className="h-6 w-6 text-copper" />
                </div>
                <h3 className="text-xl font-display">HQ Membership</h3>
                <p className="text-sm text-muted-foreground">
                  Join a community of builders. Trending content, curated ideas,
                  live builds, and direct access.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="wave-divider-copper" />

      {/* Case Studies */}
      <section className="bg-butter/20 py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-display mb-14">Built with Veelogg</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Hook Generator",
                metric: "20 hooks in 10 seconds",
                desc: "10 proven frameworks, instant copy, built on Claude.",
              },
              {
                title: "Nurture Engine",
                metric: "Automated email funnels",
                desc: "Google Sheets → Notion → Gmail. Hands-free lead nurturing for 7 clients.",
              },
              {
                title: "Trends Pipeline",
                metric: "Fresh ideas daily",
                desc: "Apify scrapers → n8n → Claude scoring → Notion HQ. Autopilot trend curation.",
              },
            ].map((study) => (
              <Card key={study.title}>
                <CardContent className="pt-6 pb-6 space-y-2">
                  <p className="text-xs font-semibold uppercase text-copper tracking-wider">
                    {study.metric}
                  </p>
                  <h3 className="text-lg font-display">{study.title}</h3>
                  <p className="text-sm text-muted-foreground">{study.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="wave-divider" />

      {/* HQ Preview */}
      <section className="container py-20 text-center">
        <h2 className="text-3xl font-display">Veelogg HQ</h2>
        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
          A Notion-powered command center where trends, ideas, builds, and community live.
          Dashboard. News feed. Idea Vault. Build Library. Live Builds.
        </p>
        <Button className="mt-8" variant="outline" asChild>
          <a href="https://tools.veelogg.com/signup">Join the waitlist</a>
        </Button>
      </section>

      {/* Studio */}
      <section className="bg-nebula/20 scallop-top py-20">
        <div className="container max-w-2xl text-center">
          <h2 className="text-3xl font-display">The Studio</h2>
          <p className="mt-4 text-muted-foreground">
            Veelogg is Varnika&apos;s creative AI engineering studio — where code meets
            content. Every tool, workflow, and system is designed, built, and documented
            in public. This isn&apos;t just a product company. It&apos;s a proof-of-work portfolio
            for the AI creator economy.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10">
        <div className="container flex flex-col items-center gap-4 text-center text-sm text-muted-foreground">
          <span className="font-display text-lg text-foreground">Veelogg</span>
          <p>AI tools for creators who build.</p>
          <div className="flex gap-4">
            <a href="https://tools.veelogg.com" className="hover:text-foreground transition-colors">
              Toolkit
            </a>
            <a href="https://tools.veelogg.com/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
