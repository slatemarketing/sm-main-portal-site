"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Bolt,
  Brush,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileSpreadsheet,
  Gauge,
  Globe,
  Headphones,
  Layers3,
  Mail,
  MapPin,
  Megaphone,
  Palette,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users2,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// ---
// Home / Landing page for Slate Marketing
// Follows the visual language of the admin/client portal (compact top nav, light surfaces, soft cards, clean dividers)
// Uses ShadCN UI + Tailwind + Lucide icons and theme tokens like text-accent
// ---

export default function SlateMarketingHome() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/40 to-background"
          aria-hidden
        />
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1 w-fit"
              >
                <span className="inline-flex items-center gap-1 text-accent">
                  <Sparkles className="h-4 w-4" />
                  Results-first marketing
                </span>
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Grow faster with a{" "}
                <span className="text-accent">data‑driven</span> marketing
                partner
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Slate Marketing helps ambitious teams acquire customers, launch
                campaigns, and turn insights into compounding growth. Strategy,
                creative, and analytics—under one roof.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2"
                  >
                    Start a project <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#work" className="inline-flex items-center gap-2">
                    See what we do <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex gap-8 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Trusted by startups & SMBs
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  ROI focused
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="border-muted/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <BarChart3 className="h-5 w-5 text-accent" /> Live
                    Performance Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Leads", value: "3.2k", icon: Target },
                      { label: "ROAS", value: "4.3x", icon: Gauge },
                      { label: "CPL", value: "$18", icon: FileSpreadsheet },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border bg-card p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {item.label}
                          </span>
                          <item.icon className="h-4 w-4 text-accent" />
                        </div>
                        <div className="mt-2 text-2xl font-semibold">
                          {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl border bg-card p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Megaphone className="h-4 w-4 text-accent" /> Top
                        Channel
                      </div>
                      <div className="mt-1 text-lg font-semibold">
                        Paid Social
                      </div>
                      <p className="text-sm text-muted-foreground">
                        +38% conv. rate WoW
                      </p>
                    </div>
                    <div className="rounded-xl border bg-card p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users2 className="h-4 w-4 text-accent" /> Top Audience
                      </div>
                      <div className="mt-1 text-lg font-semibold">
                        B2B SaaS • Mid‑Market
                      </div>
                      <p className="text-sm text-muted-foreground">
                        CPL −22% vs. last month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS SLATE */}
      <section id="about" className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="rounded-2xl border bg-muted/40 p-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Layers3,
                    label: "Full‑stack",
                    text: "Strategy → Creative → Data",
                  },
                  {
                    icon: Brush,
                    label: "Brand‑safe",
                    text: "On‑voice, on‑brand",
                  },
                  {
                    icon: Gauge,
                    label: "Efficient",
                    text: "Optimize for outcomes",
                  },
                  {
                    icon: ShieldCheck,
                    label: "Reliable",
                    text: "Clear SLAs & reporting",
                  },
                ].map((f) => (
                  <Card key={f.label} className="border-muted/60">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <f.icon className="h-4 w-4 text-accent" />
                        <div className="font-medium">{f.label}</div>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {f.text}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-7 space-y-4">
            <Badge variant="outline" className="rounded-full">
              About Slate
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Your modern marketing engine
            </h2>
            <p className="text-muted-foreground text-lg">
              We combine performance marketing, brand storytelling, and rigorous
              analytics to deliver predictable growth. Whether you need a launch
              plan, an always‑on acquisition program, or a full funnel overhaul,
              Slate becomes an extension of your team.
            </p>
            <div className="flex gap-3 pt-2">
              <Badge variant="secondary">B2B & B2C</Badge>
              <Badge variant="secondary">SaaS • E‑commerce • Services</Badge>
              <Badge variant="secondary">Remote‑first</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section id="work" className="border-t bg-muted/20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <Badge variant="outline" className="rounded-full">
              What we offer
            </Badge>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Services built for outcomes
            </h2>
            <p className="mt-2 text-muted-foreground">
              Pick a single channel or engage a full growth squad. We tailor
              roadmaps around your KPIs and stage.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Performance & Paid Media",
                icon: Megaphone,
                points: [
                  "Google, Meta, LinkedIn, X",
                  "Creative iteration",
                  "Attribution & ROAS",
                ],
              },
              {
                title: "Content & SEO",
                icon: Globe,
                points: [
                  "Topic strategy",
                  "Editorial & on‑page",
                  "Technical SEO",
                ],
              },
              {
                title: "Lifecycle & CRM",
                icon: BellRing,
                points: [
                  "Email/SMS automation",
                  "Lead nurturing",
                  "Win‑back & upsell",
                ],
              },
              {
                title: "Design & Brand",
                icon: Palette,
                points: [
                  "Visual identity",
                  "Messaging frameworks",
                  "Design systems",
                ],
              },
              {
                title: "Analytics & Experimentation",
                icon: BarChart3,
                points: ["Tracking & dashboards", "A/B testing", "Forecasting"],
              },
              {
                title: "Web & Landing Pages",
                icon: Wand2,
                points: ["UX & CRO", "Next.js sites", "Speed & accessibility"],
              },
            ].map((s) => (
              <Card
                key={s.title}
                className="group border-muted/60 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <s.icon className="h-5 w-5 text-accent" /> {s.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {s.points.map((p) => (
                    <div
                      key={p}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-accent" /> {p}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="#contact" className="inline-flex items-center gap-2">
                Request a proposal <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/features">Explore all features</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5 space-y-3">
            <Badge variant="outline" className="rounded-full">
              Why Slate
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Built like a product team
            </h2>
            <p className="text-muted-foreground">
              We operate cross‑functionally with weekly sprints, clear KPIs, and
              transparent reporting. Expect fast feedback cycles and measurable
              wins.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: "Faster time‑to‑value", icon: Rocket },
                { label: "Full‑funnel view", icon: Layers3 },
                { label: "Testing culture", icon: ClipboardCheck },
                { label: "Security & privacy", icon: ShieldCheck },
              ].map((i) => (
                <div key={i.label} className="rounded-xl border bg-card p-4">
                  <div className="flex items-center gap-2 font-medium">
                    <i.icon className="h-4 w-4 text-accent" /> {i.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 grid gap-4 md:grid-cols-3">
            {[
              { k: "+120%", t: "MQLs in 90 days" },
              { k: "4.3x", t: "avg. ROAS across paid" },
              { k: "-28%", t: "CPL after CRO revamp" },
            ].map((stat) => (
              <Card key={stat.t} className="border-muted/60">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-accent">{stat.k}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {stat.t}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t bg-muted/20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <Badge variant="outline" className="rounded-full">
              How we work
            </Badge>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              A clear, collaborative process
            </h2>
            <p className="mt-2 text-muted-foreground">
              Weekly sprints with dashboards you can trust.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              {
                step: 1,
                title: "Discover",
                icon: Headphones,
                text: "Deep dive on goals, ICP, and funnel health.",
              },
              {
                step: 2,
                title: "Plan",
                icon: Target,
                text: "Roadmap mapped to KPIs and milestones.",
              },
              {
                step: 3,
                title: "Launch",
                icon: Rocket,
                text: "Ship campaigns, content, and experiences.",
              },
              {
                step: 4,
                title: "Optimize",
                icon: Gauge,
                text: "Measure, test, and scale what works.",
              },
            ].map((s) => (
              <Card key={s.step} className="border-muted/60">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <s.icon className="h-4 w-4 text-accent" /> Step {s.step}
                  </div>
                  <div className="mt-2 text-lg font-semibold">{s.title}</div>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section id="updates" className="container mx-auto px-4 py-16 md:py-24">
        <Card className="border-muted/60">
          <CardContent className="grid gap-6 p-8 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2 space-y-2">
              <h3 className="text-2xl font-semibold">
                Get fresh insights in your inbox
              </h3>
              <p className="text-muted-foreground">
                Monthly playbooks on growth, creative, and analytics. No
                spam—unsubscribe anytime.
              </p>
            </div>
            <form className="flex w-full flex-col gap-3 md:flex-row">
              <Input
                type="email"
                placeholder="you@company.com"
                className="h-11"
              />
              <Button type="submit" className="h-11 md:ml-2">
                Sign up
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t bg-muted/20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <Badge variant="outline" className="rounded-full">
              Contact
            </Badge>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Tell us about your goals
            </h2>
            <p className="mt-2 text-muted-foreground">
              We typically reply within one business day.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-5">
            <Card className="md:col-span-3 border-muted/60">
              <CardContent className="p-6">
                <form className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Full name" />
                    <Input type="email" placeholder="Work email" />
                  </div>
                  <Input placeholder="Company" />
                  <Input placeholder="Website (optional)" />
                  <Textarea rows={5} placeholder="How can we help?" />
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      By submitting, you agree to our terms.
                    </div>
                    <Button type="submit">Send message</Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="md:col-span-2 grid gap-4">
              <Card className="border-muted/60">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 font-medium">
                    <Mail className="h-4 w-4 text-accent" />
                    Email
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    support@slatemarketing.org
                  </p>
                </CardContent>
              </Card>
              <Card className="border-muted/60">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 font-medium">
                    <Phone className="h-4 w-4 text-accent" />
                    Phone
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    (555) 000‑1234
                  </p>
                </CardContent>
              </Card>
              <Card className="border-muted/60">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 font-medium">
                    <MapPin className="h-4 w-4 text-accent" />
                    Location
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Remote‑first • US & Canada
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="border-muted/60">
          <CardContent className="p-8 md:p-10 text-center">
            <h3 className="text-3xl md:text-4xl font-bold">
              Ready to accelerate growth?
            </h3>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Partner with a team that ships, learns, and scales alongside you.
              Let’s build your next quarter together.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild size="lg">
                <Link href="#contact">Start a project</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn more</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
