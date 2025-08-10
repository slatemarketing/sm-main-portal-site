import { deleteCompany, getCompany } from "@/actions/companies";
import { AdminPortalLayout } from "@/components/layout/portal-layout";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/generated/prisma";
import { CompanyStatusSelector } from "@/components/admin/companies/company-status-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auth } from "@/lib/auth";
import {
  ArrowLeft,
  Building2,
  Edit,
  Globe,
  Info,
  Mail,
  MoreHorizontal,
  Pencil,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { toast } from "sonner";
import { CompanyTabsWrapper } from "@/components/admin/companies/company-tabs-wrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getUsers, getUsersNoCompany } from "@/actions/users";

interface CompanyPageProps {
  params: {
    id: string;
  };
  searchParams: { tab?: string };
}

export default async function InvoiceIdPage({
  params,
  searchParams,
}: CompanyPageProps) {
  const { id } = await params;
  const company = await getCompany(id);

  const activeTab = searchParams.tab || "overview";

  const [allUsers, availableUsers] = await Promise.all([
    getUsers(),
    getUsersNoCompany(),
  ]);

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

  // Handle case where invoice doesn't exist
  if (!company) {
    notFound();
  }

  async function handleCompanyDelete(id: string) {
    try {
      await deleteCompany(id);
      toast.success("Company Deleted Successfully!");
      window.location.replace("/admin/companies");
    } catch (error) {
      console.log("Error deleting company", error);
      toast.error("Error deleting company");
    }
  }

  return (
    <AdminPortalLayout>
      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {company.name}
            </h1>
            <p className="text-muted-foreground">Company ID: {company.id}</p>
          </div>
          <div className="flex gap-3 items-center">
            <Link href="/admin/companies">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Companies
              </Button>
            </Link>
            <Tooltip>
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
            </Tooltip>
          </div>
        </div>

        <CompanyTabsWrapper
          initialTab={activeTab}
          company={company}
          allUsers={allUsers}
          availableUsers={availableUsers}
          user={user}
        />
      </div>
    </AdminPortalLayout>
  );
}
