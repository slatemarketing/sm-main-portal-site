"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CircleUser, LogIn, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useSessionWithProfile } from "@/hooks/use-session-with-profile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Define the navigation items with their paths and labels
const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Who We Are" },
  { href: "/features", label: "Features" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  // Get current pathname to highlight active page
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSessionWithProfile();
  const isAuthenticated = !!session?.user;
  const user = session?.user;
  const userIsAdmin = user && "role" in user && user.role === "ADMIN";

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo section */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
          >
            <Image
              src="/logos/tab/slate-tab-blue-v1.png"
              alt="Slate Marketing"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              Slate Marketing
            </span>
          </Link>

          {/* Navigation links */}
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant={pathname === item.href ? "default" : "ghost"}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div>
                    <Button asChild variant="ghost" className="cursor-pointer">
                      <div className="flex flex-row gap-1 items-center text-muted-foreground hover:text-primary">
                        {session.user.profile?.avatar?.length !== 0 ||
                        session.user.profile?.avatar ? (
                          <Avatar className="w-6 h-6">
                            <AvatarImage
                              src={session.user.profile?.avatar || ""}
                              alt="Profile picture"
                            />
                            <AvatarFallback>?</AvatarFallback>
                          </Avatar>
                        ) : (
                          <CircleUser />
                        )}
                        <span>Account</span>
                      </div>
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    {user?.name}{" "}
                    {user?.profile?.company && `(${user.profile.company})`}
                    <div className="text-xs text-muted-foreground">
                      {user && "role" in user ? (user.role as string) : "User"}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/invoices")}>
                    Invoices
                  </DropdownMenuItem>
                  {userIsAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push("/admin")}>
                        Admin Panel
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => router.push("/admin/users")}
                      >
                        Manage Users
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="outline"
                className="ml-3"
                onClick={() => router.push("/auth/signin")}
              >
                <div className="flex flex-row gap-1 items-center">
                  <LogIn />
                  <span>Login</span>
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
