import { AdminPortalLayout } from "@/components/layout/portal-layout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const user = session.user;
  const userIsAdmin = user && "role" in user && user.role === "ADMIN";

  return (
    <>
      <AdminPortalLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              See all needed statistics, cost analysis, and more in a
              easy-to-navigate view.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            Coming Soon
          </div>
        </div>
      </AdminPortalLayout>
    </>
  );
}
