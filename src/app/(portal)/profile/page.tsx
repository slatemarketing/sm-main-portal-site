import { getUsers } from "@/actions/users";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import { userColumns } from "@/components/admin/users/columns-user-admin";
import { AdminPortalLayout } from "@/components/layout/portal-layout";
import { ProfileTabsWrapper } from "@/components/profile/profile-tabs-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Building2,
  Dot,
  Shovel,
  TrendingUp,
  Users,
  Users2,
} from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getCompanies() {
  return await prisma.company.findMany({
    include: {
      _count: {
        select: { users: true },
      },
    },
  });
}

export default async function AdminCompaniesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const user = session.user;
  const userIsAdmin = user && "role" in user && user.role === "ADMIN";

  if (!userIsAdmin) {
    redirect("/dashboard");
  }

  const data = await getUsers();
  const companies = await getCompanies();

  // Calculate statistics
  const totalUsers = data.length;
  const admins = data.filter((user) => user.role === "ADMIN").length;
  const clients = data.filter((user) => user.role === "CLIENT").length;
  const totalUsersInCompanies = companies.reduce(
    (sum, company) => sum + (company._count?.users || 0),
    0
  );

  return (
    <>
      <AdminPortalLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">
              Create or update your profile
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full">
              <ProfileTabsWrapper />
            </div>
          </div>
        </div>
      </AdminPortalLayout>
    </>
  );
}
