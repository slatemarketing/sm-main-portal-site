import { ViewInvoiceAdmin } from "@/components/invoices/view-invoice-admin";
import { getInvoice } from "@/actions/invoices";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { BackButton } from "@/components/ui/back-button";

interface InvoiceIdPageProps {
  params: {
    id: string;
  };
}

export default async function InvoiceIdPage({ params }: InvoiceIdPageProps) {
  const invoice = await getInvoice(params.id);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/signin");
  }

  const user = session.user;
  const userIsAdmin = user && "role" in user && user.role === "ADMIN";

  // Handle case where invoice doesn't exist
  if (!invoice) {
    notFound();
  }

  return (
    <>
      <div className="grid grid-cols-5 mt-3 mb-10 gap-4">
        <div className="col-span-3 col-start-2">
          <Card>
            <CardContent>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold">
                    Invoice Details - {userIsAdmin ? "ADMIN" : "USER"}
                  </h1>
                  <p className="text-muted-foreground">
                    Invoice #{invoice.invoiceNumber} - {invoice.title}
                  </p>
                </div>
                <div>
                  <BackButton>Go Back</BackButton>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* <div className="col-start-2 col-span-1"> */}
        <ViewInvoiceAdmin id={params.id} />
        {/* </div> */}
      </div>
    </>
  );
}
