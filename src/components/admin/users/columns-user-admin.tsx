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

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: string;
  companyId: string | null;

  createdAt: Date;
  updatedAt: Date;
};

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div>
          <Link href={`/admin/users/${user.id}`} className="text-primary">
            {user.name}
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
      const user = row.original;

      return <CellBadge status={user.role} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
                router.push(`/admin/users/${user.id}?tab=overview`)
              }
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Edit</DropdownMenuItem>
            {/* <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(user, null, 2));
              }}
            >
              Copy Full Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(user.email);
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
        status === "ADMIN"
          ? "bg-green-100 text-green-800"
          : status === "CLIENT"
          ? "bg-yellow-100 text-yellow-800"
          : ""
      }`}
    >
      <p className="text-[8px] font-medium">{status}</p>
    </div>
  );
}
