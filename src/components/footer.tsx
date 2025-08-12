import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <footer className="border-t bg-background/60">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/logos/tab/slate-tab-blue-v1.png"
                alt="Slate Marketing"
                width={28}
                height={28}
              />
              <span className="font-semibold">Slate Marketing</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Strategy, creative, and analytics to help you grow faster. Proudly
              built with modern web tech.
            </p>
          </div>
          <div>
            <div className="font-medium">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about">Who we are</Link>
              </li>
              <li>
                <Link href="/features">Features</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-medium">Services</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Paid Media</li>
              <li>SEO & Content</li>
              <li>Lifecycle</li>
              <li>Analytics</li>
            </ul>
          </div>
          <div>
            <div className="font-medium">Get updates</div>
            <form className="mt-3 flex gap-2">
              <Input type="email" placeholder="you@company.com" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Slate Marketing. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
