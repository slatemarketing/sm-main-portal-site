"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { deleteInvoice, getInvoices } from "@/actions/invoices";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import CreateInvoiceDialog from "./create-invoice-dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";

export function ClientInvoiceList() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [rendering, setRendering] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchInvoices = async () => {
      try {
        const invoices = await getInvoices({ id: session.user.id });
        setInvoices(invoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setRendering(false);
      }
    };

    fetchInvoices();
  }, [session?.user?.id]);

  if (isPending) return <div>Loading...</div>;
  if (!session) return <div>Not authenticated</div>;

  if (rendering) return <div>Loading...</div>;

  async function handleDelete(id: string) {
    setLoading(true);
    try {
      await deleteInvoice(id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting invoice! Error:", error);
      toast.error("Error deleting invoice! Please check console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p>Title - Company</p>
        <p>Invoice Name</p>
      </div>
      <div className="space-y-3">
        {invoices.length === 0 && (
          <div>
            <Card>
              <CardContent>No Invoices Found</CardContent>
            </Card>
          </div>
        )}
        {invoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardContent className="p-1 ml-4">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h2 className="text-lg">
                    {invoice.title} - {invoice.company}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Name: {invoice.name}
                  </p>
                </div>
                <div className="flex flex-row gap-2 mr-4">
                  <Button
                    variant="default"
                    onClick={() => router.push(`/invoices/${invoice.id}`)}
                  >
                    View
                  </Button>
                  <Button variant="destructive">Pay</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <CreateInvoiceDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
