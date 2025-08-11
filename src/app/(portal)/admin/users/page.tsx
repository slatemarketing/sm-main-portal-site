import { getUsers } from "@/actions/users";
import { AdminDataTable } from "@/components/admin/admin-data-table";
import { userColumns } from "@/components/admin/users/columns-user-admin";
import { AdminPortalLayout } from "@/components/layout/portal-layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
            <h1 className="text-3xl font-bold tracking-tight">
              Users Management
            </h1>
            <p className="text-muted-foreground">
              Manage all registered users and view key metrics
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent>
                <div className="flex flex-row justify-between">
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium">Total Users</h2>
                    <h3 className="text-2xl font-bold">{totalUsers}</h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      {admins} active companies
                    </p>
                  </div>
                  <div>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex flex-row justify-between">
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium">Admins</h2>
                    <h3 className="text-2xl font-bold">{admins}</h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      {admins === 0
                        ? "0.0"
                        : ((admins / totalUsers) * 100).toFixed(1)}
                      % of total users
                    </p>
                  </div>
                  <div>
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="flex flex-row justify-between">
                  <div className="space-y-1">
                    <h2 className="text-sm font-medium">Total Employees</h2>
                    <h3 className="text-2xl font-bold">
                      {totalUsersInCompanies}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      Across all companies
                    </p>
                  </div>
                  <div>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardContent>
                <AdminDataTable columns={userColumns} data={data} />
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminPortalLayout>
    </>
  );
}
