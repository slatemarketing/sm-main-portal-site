"use client";

import { CompanyStatus } from "@/generated/prisma";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type Company = {
  id: string;
  companyNumber: number;

  name: string;
  description: string | null;
  logo: string | null;
  email: string;
  phone: string | null;
  status: CompanyStatus;

  _count: { users: number };

  address: string;
  city: string;
  state: string | null;
  postalCode: string;
  country: string;

  billingEmail: string | null;
  billingAddress: string | null;
  billingCity: string | null;
  billingState: string | null;
  billingPostalCode: string | null;
  billingCountry: string | null;
  taxId: string | null;

  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "companyNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const company = row.original;

      return (
        <div>
          <Link
            href={`/admin/companies/${company.id}`}
            className="text-primary"
          >
            {company.name}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const company = row.original;

      return <CellBadge status={company.status} />;
    },
  },
  {
    accessorKey: "_count.users",
    header: "Users",
    cell: ({ row }) => {
      const company = row.original;
      const count = company._count?.users || 0;
      return (
        <div className="text-left">
          <span className="">{count}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const company = row.original;

      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.push(`/admin/companies/${company.id}?tab=overview`)
              }
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Edit</DropdownMenuItem>
            {/* <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(company, null, 2));
              }}
            >
              Copy Full Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(company.email);
              }}
            >
              Copy Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function CellBadge({ status }: { status: string }) {
  return (
    <div
      className={`px-0.5 py-0.5 rounded-full text-center mr-4 ${
        status === "PENDING"
          ? "bg-yellow-100 text-yellow-800"
          : status === "ACTIVE"
          ? "bg-green-100 text-green-800"
          : status === "INACTIVE"
          ? "bg-red-100 text-red-800"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <p className="text-[8px] font-medium">{status}</p>
    </div>
  );
}
