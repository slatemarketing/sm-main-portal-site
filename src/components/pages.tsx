"use client";

/**
 * Slate Marketing — Additional Pages
 *
 * This file contains three page components ready for Next.js / ShadCN / Tailwind.
 * Copy each component into its own route file, for example:
 *   app/(site)/features/page.tsx       -> export default FeaturesPage
 *   app/(site)/about/page.tsx          -> export default AboutPage
 *   app/(site)/contact/page.tsx        -> export default ContactPage
 *
 * Uses: ShadCN UI, Lucide icons, Tailwind + your theme tokens (text-accent, bg-card, bg-muted, etc.)
 * Images: picsum.photos seeded URLs for stable placeholders that open in a new tab.
 */

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Bolt,
  CheckCircle2,
  ClipboardCheck,
  Globe,
  Layers3,
  Palette,
  ShieldCheck,
  Sparkles,
  Target,
  Wand2,
  Users2,
  Rocket,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const img = {
  featHero: "https://picsum.photos/seed/slate-features-hero/1600/900",
  feat1: "https://picsum.photos/seed/slate-feature1/1200/720",
  feat2: "https://picsum.photos/seed/slate-feature2/1200/720",
  feat3: "https://picsum.photos/seed/slate-feature3/1200/720",
  deepDive1: "https://picsum.photos/seed/slate-deep1/1400/900",
  deepDive2: "https://picsum.photos/seed/slate-deep2/1400/900",
  aboutHero: "https://picsum.photos/seed/slate-about-hero/1600/900",
  team1: "https://picsum.photos/seed/slate-team1/800/800",
  team2: "https://picsum.photos/seed/slate-team2/800/800",
  team3: "https://picsum.photos/seed/slate-team3/800/800",
  team4: "https://picsum.photos/seed/slate-team4/800/800",
  office: "https://picsum.photos/seed/slate-office/1600/800",
  contactHero: "https://picsum.photos/seed/slate-contact-hero/1600/900",
  map: "https://picsum.photos/seed/slate-map/1600/900",
};

// -------------------------------------------------------------------------------------
// FEATURES PAGE
// -------------------------------------------------------------------------------------

export default function FeaturesPageNew() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div className="pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6 space-y-6">
              <Badge
                variant="secondary"
                className="rounded-full w-fit px-3 py-1"
              >
                <span className="inline-flex items-center gap-1 text-accent">
                  <Sparkles className="h-4 w-4" />
                  Feature set
                </span>
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold">
                Everything you need to grow
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                From acquisition to lifecycle to analytics, Slate bundles the
                tools and expertise that compound results.
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="#capabilities">Explore capabilities</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Talk to us</Link>
                </Button>
              </div>
            </div>
            <div className="md:col-span-6">
              <a
                href={img.featHero}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border bg-card p-2 shadow-sm"
              >
                <img
                  src={img.featHero}
                  alt="Features hero"
                  className="rounded-xl object-cover w-full h-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES GRID */}
      <section
        id="capabilities"
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">Capabilities</h2>
          <p className="mt-2 text-muted-foreground">
            Purpose‑built services you can adopt independently or as a
            full‑funnel program.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Performance & Paid Media",
              icon: Target,
              img: img.feat1,
              points: [
                "Google, Meta, LinkedIn, X",
                "Creative iteration & testing",
                "Attribution & ROAS",
              ],
            },
            {
              title: "Content & SEO",
              icon: Globe,
              img: img.feat2,
              points: [
                "Topic strategy",
                "Editorial & on‑page",
                "Technical SEO",
              ],
            },
            {
              title: "Lifecycle & CRM",
              icon: BellRing,
              img: img.feat3,
              points: [
                "Email/SMS automation",
                "Lead nurturing",
                "Win‑back & upsell",
              ],
            },
          ].map((s) => (
            <Card key={s.title} className="overflow-hidden border-muted/60">
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <s.icon className="h-5 w-5 text-accent" />
                  {s.title}
                </CardTitle>
                <CardDescription>
                  Outcome‑driven playbooks built around your KPIs.
                </CardDescription>
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
      </section>

      {/* DEEP DIVES */}
      <section className="border-t bg-muted/20 py-16 md:py-24">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-2">
          {[
            {
              title: "Analytics & Experimentation",
              text: "Track what matters and ship weekly experiments. Dashboards, A/B testing, and forecasting baked in.",
              img: img.deepDive1,
              icon: BarChart3,
            },
            {
              title: "Web & Landing Pages",
              text: "Performance‑oriented pages built on Next.js and tuned for speed, accessibility, and CRO.",
              img: img.deepDive2,
              icon: Wand2,
            },
          ].map((d) => (
            <Card key={d.title} className="overflow-hidden border-muted/60">
              <a
                href={d.img}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <div className="relative aspect-[16/9] w-full bg-card">
                  <img
                    src={d.img}
                    alt={d.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </a>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <d.icon className="h-5 w-5 text-accent" /> {d.title}
                </CardTitle>
                <CardDescription>{d.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="border-muted/60">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">
              See how Slate fits your stack
            </h3>
            <p className="mt-2 text-muted-foreground">
              Get a tailored plan for your goals and stage.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Button asChild>
                <Link href="/contact">Request a proposal</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#capabilities">Explore capabilities</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

// -------------------------------------------------------------------------------------
// WHO WE ARE (ABOUT) PAGE
// -------------------------------------------------------------------------------------

export function WhoWeArePageNew() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div className="container mx-auto px-4 py-16 md:py-24 grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6 space-y-6">
            <Badge variant="secondary" className="rounded-full w-fit px-3 py-1">
              <span className="inline-flex items-center gap-1 text-accent">
                <Users2 className="h-4 w-4" />
                Our story
              </span>
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              A team obsessed with outcomes
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              We’re strategists, creatives, and analysts who’ve shipped for
              startups and enterprise. We move quickly and measure everything.
            </p>
            <div className="flex gap-3">
              <Button asChild>
                <Link href="#values">Our values</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#team">Meet the team</Link>
              </Button>
            </div>
          </div>
          <div className="md:col-span-6">
            <a
              href={img.aboutHero}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border bg-card p-2 shadow-sm"
            >
              <img
                src={img.aboutHero}
                alt="About hero"
                className="rounded-xl object-cover w-full h-auto"
              />
            </a>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section id="values" className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold">What we believe</h2>
          <p className="mt-2 text-muted-foreground">
            Principles that shape how we work and partner with clients.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Own the outcome",
              icon: Target,
              text: "We tie our work to business results, not busywork.",
            },
            {
              title: "Ship and learn",
              icon: Rocket,
              text: "Small, frequent releases beat big‑bang bets.",
            },
            {
              title: "Speak plainly",
              icon: ClipboardCheck,
              text: "No fluff. Clear plans, clear reporting.",
            },
            {
              title: "Design with empathy",
              icon: Palette,
              text: "We build for real people, not vanity metrics.",
            },
            {
              title: "Guard trust",
              icon: ShieldCheck,
              text: "Security and privacy are non‑negotiable.",
            },
            {
              title: "Automate the boring",
              icon: Bolt,
              text: "We use tools and process to move faster.",
            },
          ].map((v) => (
            <Card key={v.title} className="border-muted/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <v.icon className="h-5 w-5 text-accent" /> {v.title}
                </CardTitle>
                <CardDescription>{v.text}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* TEAM GRID */}
      <section id="team" className="border-t bg-muted/20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold">Team</h2>
            <p className="mt-2 text-muted-foreground">
              Multi‑disciplinary and remote‑first across the U.S. & Canada.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Taylor Reed", role: "Head of Strategy", img: img.team1 },
              { name: "Jordan Kim", role: "Creative Director", img: img.team2 },
              { name: "Avery Shaw", role: "Growth Lead", img: img.team3 },
              { name: "Riley Fox", role: "Analytics Lead", img: img.team4 },
            ].map((m) => (
              <Card key={m.name} className="overflow-hidden border-muted/60">
                <a
                  href={m.img}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <div className="aspect-square w-full bg-card">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </a>
                <CardContent className="p-4">
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-muted-foreground">{m.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE / IMAGE */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold">
              From brief to impact
            </h3>
            <p className="text-muted-foreground">
              We’ve delivered launches, rebuilds, and always‑on programs that
              move the needle.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" /> +120% MQLs in
                90 days
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" /> 4.3× average
                ROAS across paid
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" /> −28% CPL after
                CRO revamp
              </li>
            </ul>
          </div>
          <a
            href={img.office}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border bg-card p-2 shadow-sm"
          >
            <img
              src={img.office}
              alt="Office"
              className="rounded-xl object-cover w-full h-auto"
            />
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <Card className="border-muted/60">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">
              Want to work with us?
            </h3>
            <p className="mt-2 text-muted-foreground">
              Let’s talk about goals, constraints, and timing.
            </p>
            <div className="mt-5">
              <Button asChild>
                <Link href="/contact">Start a conversation</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

// -------------------------------------------------------------------------------------
// CONTACT PAGE
// -------------------------------------------------------------------------------------

export function ContactPageNew() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative overflow-hidden border-b">
        <div className="container mx-auto px-4 py-16 md:py-24 grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6 space-y-6">
            <Badge variant="secondary" className="rounded-full w-fit px-3 py-1">
              <span className="inline-flex items-center gap-1 text-accent">
                <Mail className="h-4 w-4" />
                Contact
              </span>
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Tell us about your goals
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              We typically reply within one business day.
            </p>
          </div>
          <div className="md:col-span-6">
            <a
              href={img.contactHero}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border bg-card p-2 shadow-sm"
            >
              <img
                src={img.contactHero}
                alt="Contact hero"
                className="rounded-xl object-cover w-full h-auto"
              />
            </a>
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-5">
          <Card className="md:col-span-3 border-muted/60">
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
              <CardDescription>
                We'll tailor our reply to your needs.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 md:p-8 md:pt-0">
              <form className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Full name" />
                  <Input type="email" placeholder="Work email" />
                </div>
                <Input placeholder="Company" />
                <Input placeholder="Website (optional)" />
                <Textarea rows={6} placeholder="How can we help?" />
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
            {[
              {
                title: "Email",
                text: "support@slatemarketing.org",
                icon: Mail,
              },
              {
                title: "Phone",
                text: "(555) 000‑1234",
                icon: Phone,
              },
              {
                title: "Location",
                text: "Remote‑first • US & Canada",
                icon: MapPin,
              },
            ].map((i) => (
              <Card key={i.title} className="border-muted/60">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 font-medium">
                    <i.icon className="h-4 w-4 text-accent" /> {i.title}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{i.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MAP / FAQ */}
      <section className="border-t bg-muted/20 py-16 md:py-24">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-2">
          <a
            href={img.map}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border bg-card p-2 shadow-sm"
          >
            <img
              src={img.map}
              alt="Map"
              className="rounded-xl object-cover w-full h-auto"
            />
          </a>

          <div>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-semibold">Frequently asked</h3>
            </div>
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="q1">
                <AccordionTrigger>How soon can we start?</AccordionTrigger>
                <AccordionContent>
                  Most projects kick off within 1–2 weeks after scoping and
                  contracting.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>
                  Do you work with early‑stage companies?
                </AccordionTrigger>
                <AccordionContent>
                  Yes. We tailor roadmaps to stage—from validation to scale.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>
                  Can you integrate with our stack?
                </AccordionTrigger>
                <AccordionContent>
                  We regularly work with HubSpot, Salesforce, GA4, Looker,
                  Segment, and more.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-16 md:pb-24">
        <Card className="border-muted/60">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">
              Ready when you are
            </h3>
            <p className="mt-2 text-muted-foreground">
              Tell us your goals and constraints—let’s craft a plan.
            </p>
            <div className="mt-5">
              <Button asChild>
                <Link href="/contact">Start a project</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
