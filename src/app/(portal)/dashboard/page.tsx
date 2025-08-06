import { LogOutButton } from "@/components/auth/log-out-button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="grid h-screen place-items-center space-y-2">
      <Card>
        <CardContent className="space-y-3 flex flex-col items-center">
          <h1 className="text-xl font-semibold">
            Welcome Back, {session.user.name}!
          </h1>
          <LogOutButton />
        </CardContent>
      </Card>
    </div>
  );
}
