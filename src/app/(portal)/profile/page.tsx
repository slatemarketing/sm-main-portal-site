import { InvoiceList } from "@/components/invoices/admin-invoices-panel";
import { ProfileForm } from "@/components/profile/profile-form";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const user = session.user;
  const userIsAdmin = user && "role" in user && user.role === "ADMIN";

  const profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="grid grid-cols-5 mt-10 gap-4">
      <Card className="col-span-3 col-start-2">
        <CardContent>
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">
              Profile - {userIsAdmin ? "ADMIN" : "USER"}
            </h1>
            <Avatar className="w-12 h-12">
              <AvatarImage src={profile?.avatar || ""} alt="Profile picture" />
              <AvatarFallback className="text-2xl">?</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3 col-start-2">
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
