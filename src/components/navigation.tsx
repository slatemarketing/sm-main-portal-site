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
import {
  Briefcase,
  Building2,
  ChartColumn,
  CircleUser,
  FileText,
  Icon,
  LogIn,
  LogOut,
  Settings,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useSessionWithProfile } from "@/hooks/use-session-with-profile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { isAdmin } from "@/lib/roles";
import { LogOutButton } from "./auth/log-out-button";

// Define the navigation items with their paths and labels
const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Who We Are" },
  { href: "/features", label: "Features" },
  { href: "/contact", label: "Contact" },
];

const portalNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: <ChartColumn /> },
  { href: "/profile", label: "Profile", icon: <Building2 /> },
  { href: "/invoices", label: "Invoices", icon: <FileText /> },
  { href: "/settings", label: "Settings", icon: <Settings /> },
];

const adminPortalNavItems = [
  { href: "/admin", label: "Admin Panel", icon: <ChartColumn /> },
  { href: "/admin/users", label: "Users", icon: <Building2 /> },
  { href: "/admin/companies", label: "Companies", icon: <Briefcase /> },
];

export function Navigation() {
  // Get current pathname to highlight active page
  const pathname = usePathname();
  const router = useRouter();

  // Helper function to check if current path matches or starts with the nav item path
  const isActiveRoute = (itemPath: string) => {
    if (
      itemPath === "/" ||
      itemPath === "/dashboard" ||
      itemPath === "/admin"
    ) {
      // For home and dashboard, require exact match
      return pathname === itemPath;
    }
    // For other routes, check if current path starts with the nav item path
    return pathname.startsWith(itemPath);
  };

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
                      <DropdownMenuItem
                        onClick={() => router.push("/admin/companies")}
                      >
                        Manage Companies
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
        {session && (
          <div className="flex h-14 items-center justify-items-between gap-5">
            <Link href="/dashboard">
              <div className="flex flex-row gap-3 items-center">
                <Building2 />
                <h1 className="text-2xl font-semibold">
                  {userIsAdmin ? "Admin Portal" : "Client Portal"}
                </h1>
              </div>
            </Link>
            <div className="flex items-center space-x-2">
              {userIsAdmin && (
                <>
                  {adminPortalNavItems.map((item) => (
                    <Button
                      key={item.href}
                      asChild
                      variant={isActiveRoute(item.href) ? "default" : "ghost"}
                      className={cn(
                        "text-sm font-medium transition-colors",
                        isActiveRoute(item.href)
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <Link href={item.href}>{item.label}</Link>
                      </div>
                    </Button>
                  ))}
                  <div className="h-4 w-px bg-border mx-2" />
                </>
              )}
              {portalNavItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant={isActiveRoute(item.href) ? "default" : "ghost"}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActiveRoute(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <Link href={item.href}>{item.label}</Link>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
