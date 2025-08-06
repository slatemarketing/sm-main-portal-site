import { RoleGuard } from "@/components/auth/role-guard";
import { AdminInvoiceList } from "@/components/invoices/admin-invoices-panel";
import { ClientInvoiceList } from "@/components/invoices/client-invoices-panel";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function InvoicesPage() {
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
      <div className="grid grid-cols-5 mt-10 gap-4">
        <Card className="col-span-3 col-start-2">
          <CardContent>
            <h1 className="text-2xl font-bold">
              Invoices - {userIsAdmin ? "ADMIN" : "USER"}
            </h1>
          </CardContent>
        </Card>
        <Card className="col-span-3 col-start-2">
          <CardContent>
            {userIsAdmin ? <AdminInvoiceList /> : <ClientInvoiceList />}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
