"use client";

import React from "react";
import Link from "next/link";
// Note: Using <img> with picsum.photos so links work without Next Image domain config.
// Swap to next/image if you prefer and add the domains to next.config.js
import {
  ArrowRight,
  BarChart3,
  BellRing,
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

/**
 * HOME / LANDING PAGE — with sample images that are clickable links
 * - Images use https://picsum.photos with seeded URLs for consistent placeholders
 * - Each image is wrapped in an <a> that opens the source in a new tab
 * - Keeps token-based colors for your custom ShadCN theme: text-accent, bg-card, bg-muted, etc.
 */

const img = {
  hero1: "https://picsum.photos/seed/slate-analytics/1280/840",
  hero2: "https://picsum.photos/seed/slate-creative/1280/840",
  hero3: "https://picsum.photos/seed/slate-seo/1280/840",
  servicePaid: "https://picsum.photos/seed/slate-paid/1200/760",
  serviceSeo: "https://picsum.photos/seed/slate-seo-service/1200/760",
  serviceLifecycle: "https://picsum.photos/seed/slate-lifecycle/1200/760",
  serviceDesign: "https://picsum.photos/seed/slate-design/1200/760",
  serviceAnalytics:
    "https://picsum.photos/seed/slate-analytics-service/1200/760",
  serviceWeb: "https://picsum.photos/seed/slate-web/1200/760",
  case1: "https://picsum.photos/seed/slate-case1/1280/720",
  case2: "https://picsum.photos/seed/slate-case2/1280/720",
  case3: "https://picsum.photos/seed/slate-case3/1280/720",
  case4: "https://picsum.photos/seed/slate-case4/1280/720",
  logo1: "https://picsum.photos/seed/logo1/300/64",
  logo2: "https://picsum.photos/seed/logo2/300/64",
  logo3: "https://picsum.photos/seed/logo3/300/64",
  logo4: "https://picsum.photos/seed/logo4/300/64",
  logo5: "https://picsum.photos/seed/logo5/300/64",
};

export default function SlateMarketingHome() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] -z-10 h-[24rem] w-[24rem] rounded-full bg-primary/10 blur-3xl" />

        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid gap-14 md:grid-cols-2 md:items-center">
            <div className="space-y-7">
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1 w-fit"
              >
                <span className="inline-flex items-center gap-1 text-accent">
                  <Sparkles className="h-4 w-4" /> Better strategy • Better
                  creative • Better data
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

            {/* Framed hero images */}
            <div className="relative">
              <div className="relative mx-auto grid max-w-xl grid-cols-2 gap-4 md:max-w-none">
                <div className="col-span-2 md:col-span-1">
                  <div className="rounded-2xl border bg-card p-2 shadow-sm">
                    <a href={img.hero1} target="_blank" rel="noreferrer">
                      <img
                        src={img.hero1}
                        alt="Campaign Dashboard"
                        loading="lazy"
                        className="h-auto w-full rounded-xl object-cover"
                      />
                    </a>
                  </div>
                </div>
                <div className="md:mt-10">
                  <div className="rounded-2xl border bg-card p-2 shadow-sm">
                    <a href={img.hero2} target="_blank" rel="noreferrer">
                      <img
                        src={img.hero2}
                        alt="Creative Variations"
                        loading="lazy"
                        className="h-auto w-full rounded-xl object-cover"
                      />
                    </a>
                  </div>
                </div>
                <div className="-mt-6 md:-mt-2">
                  <div className="rounded-2xl border bg-card p-2 shadow-sm">
                    <a href={img.hero3} target="_blank" rel="noreferrer">
                      <img
                        src={img.hero3}
                        alt="SEO Report"
                        loading="lazy"
                        className="h-auto w-full rounded-xl object-cover"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / LOGOS */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-80">
          {[img.logo1, img.logo2, img.logo3, img.logo4, img.logo5].map(
            (src) => (
              <a
                key={src}
                href={src}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center"
              >
                <img
                  src={src}
                  alt="Brand"
                  className="h-6 w-auto rounded-md border bg-card p-2"
                  loading="lazy"
                />
              </a>
            )
          )}
        </div>
      </section>

      {/* WHAT IS SLATE */}
      <section id="about" className="container mx-auto px-4 py-20 md:py-24">
        <div className="grid gap-14 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="rounded-3xl border bg-muted/40 p-6 md:p-7">
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
                    <CardContent className="p-4 md:p-5">
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
          <div className="md:col-span-7 space-y-5">
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
            <div className="flex flex-wrap gap-3 pt-2">
              <Badge variant="secondary">B2B & B2C</Badge>
              <Badge variant="secondary">SaaS • E‑commerce • Services</Badge>
              <Badge variant="secondary">Remote‑first</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section id="work" className="border-t bg-muted/20 py-20 md:py-24">
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

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Performance & Paid Media",
                icon: Megaphone,
                img: img.servicePaid,
                points: [
                  "Google, Meta, LinkedIn, X",
                  "Creative iteration",
                  "Attribution & ROAS",
                ],
              },
              {
                title: "Content & SEO",
                icon: Globe,
                img: img.serviceSeo,
                points: [
                  "Topic strategy",
                  "Editorial & on‑page",
                  "Technical SEO",
                ],
              },
              {
                title: "Lifecycle & CRM",
                icon: BellRing,
                img: img.serviceLifecycle,
                points: [
                  "Email/SMS automation",
                  "Lead nurturing",
                  "Win‑back & upsell",
                ],
              },
              {
                title: "Design & Brand",
                icon: Palette,
                img: img.serviceDesign,
                points: [
                  "Visual identity",
                  "Messaging frameworks",
                  "Design systems",
                ],
              },
              {
                title: "Analytics & Experimentation",
                icon: BarChart3,
                img: img.serviceAnalytics,
                points: ["Tracking & dashboards", "A/B testing", "Forecasting"],
              },
              {
                title: "Web & Landing Pages",
                icon: Wand2,
                img: img.serviceWeb,
                points: ["UX & CRO", "Next.js sites", "Speed & accessibility"],
              },
            ].map((s) => (
              <Card
                key={s.title}
                className="group overflow-hidden border-muted/60 transition-colors"
              >
                <a
                  href={s.img}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <div className="relative aspect-[16/9] w-full bg-card">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </a>
                <CardHeader className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <s.icon className="h-5 w-5 text-accent" /> {s.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pb-6">
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

          <div className="mt-10 flex flex-wrap gap-3">
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

      {/* WHY CHOOSE US + CASE STUDY STRIP */}
      <section id="why" className="container mx-auto px-4 py-20 md:py-24">
        <div className="grid gap-14 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5 space-y-4">
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

          <div className="md:col-span-7 grid gap-6 md:grid-cols-2">
            {[
              { img: img.case1, k: "+120%", t: "MQLs in 90 days" },
              { img: img.case2, k: "4.3x", t: "avg. ROAS across paid" },
              { img: img.case3, k: "-28%", t: "CPL after CRO revamp" },
              { img: img.case4, k: "+3x", t: "Organic traffic YoY" },
            ].map((stat) => (
              <Card key={stat.t} className="overflow-hidden border-muted/60">
                <a
                  href={stat.img}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <div className="relative aspect-video w-full bg-card">
                    <img
                      src={stat.img}
                      alt={stat.t}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </a>
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
      <section className="border-t bg-muted/20 py-20 md:py-24">
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
          <div className="mt-10 grid gap-6 md:grid-cols-4">
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
      <section id="updates" className="container mx-auto px-4 py-20 md:py-24">
        <Card className="border-muted/60">
          <CardContent className="grid gap-8 p-8 md:grid-cols-3 md:items-center">
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
      <section id="contact" className="border-t bg-muted/20 py-20 md:py-24">
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

          <div className="mt-10 grid gap-8 md:grid-cols-5">
            <Card className="md:col-span-3 border-muted/60">
              <CardContent className="p-6 md:p-8">
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
      <section className="container mx-auto px-4 py-20 md:py-24">
        <Card className="border-muted/60 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/10 via-primary/10 to-transparent" />
            <CardContent className="p-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold">
                Ready to accelerate growth?
              </h3>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Partner with a team that ships, learns, and scales alongside
                you. Let’s build your next quarter together.
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
          </div>
        </Card>
      </section>
    </main>
  );
}
