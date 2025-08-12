import { getUser, getUsers } from "@/actions/users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { UsersTabsWrapper } from "@/components/admin/users/users-tabs-wrapper";
import { AdminPortalLayout } from "@/components/layout/portal-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface UserPageProps {
  params: {
    id: string;
  };
  searchParams: { tab?: string };
}

export default async function UserIdPage({
  params,
  searchParams,
}: UserPageProps) {
  const { id } = await params;
  const { tab } = await searchParams;
  const selectedUser = await getUser(id);

  const activeTab = tab || "overview";

  const allUsers = await getUsers();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const user = session.user;
  const userIsAdmin = user && "role" in user && user.role === "ADMIN";

  if (!userIsAdmin) {
    return <div>NOT AUTHENTICATED!</div>;
  }

  if (!selectedUser) {
    notFound();
  }

  return (
    <AdminPortalLayout>
      <div className="container mx-auto py-6">
        <div className="space-y-6">
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {selectedUser.name}
              </h1>
              <p className="text-muted-foreground">
                User ID: {selectedUser.id}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <Link href="/admin/users">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Users
                </Button>
              </Link>
              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="default"
                    disabled
                    //   onClick={() => toast.error("Not yet supported!")}
                  >
                    <Pencil /> Edit
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Currently Unavailable</p>
                </TooltipContent>
              </Tooltip> */}
            </div>
          </div>

          <UsersTabsWrapper
            initialTab={activeTab}
            selectedUser={selectedUser}
            allUsers={allUsers}
            currentUser={user}
          />
        </div>
      </div>
    </AdminPortalLayout>
  );
}
