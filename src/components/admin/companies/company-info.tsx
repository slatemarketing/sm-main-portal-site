"use client";

import { Badge } from "@/components/ui/badge";
import { Company, User, UserRole } from "@/generated/prisma";
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
import {
  Building2,
  Edit,
  Globe,
  Info,
  Loader2,
  Mail,
  MoreHorizontal,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { deleteCompany } from "@/actions/companies";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addUserToCompany,
  getUsers,
  removeUserFromCompany,
} from "@/actions/users";
import { Input } from "@/components/ui/input";
import { error } from "console";

interface CompanyInfoProps {
  company: Company & { users: any[] };
  allUsers?: User[];
  availableUsers?: User[];
  user?: any;
}

export function CompanyInfoOverviewTab({ company }: CompanyInfoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Status</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CompanyStatusSelector
            companyId={company.id}
            currentStatus={company.status}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Employees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{company.users.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contact</CardTitle>
          <Mail className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm">{company.email}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Website</CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <a
            href={company.email} // CHANGE TO WEBSITE
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Visit Site
          </a>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Company Information
          </CardTitle>
          <Info className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>Company Information & Edit - Coming Soon</CardContent>
      </Card>
    </div>
  );
}

export function CompanyInfoUsersTab({
  company,
  allUsers,
  availableUsers,
  user,
}: CompanyInfoProps) {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const router = useRouter();

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Company Users</CardTitle>
            <Button onClick={() => setAddUserOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email Status</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {company.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === UserRole.ADMIN ? "default" : "secondary"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.emailVerified ? "default" : "secondary"}
                    >
                      {user.emailVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem disabled>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            removeUserFromCompany(user.id);
                            router.push(
                              `/admin/companies/${company.id}?tab=users`
                            );
                            toast.success(
                              `User removed successfully from ${company.name}`
                            );
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Company Add User</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 flex flex-col">
            <p>
              Please select a user to add. You can only add users who are not
              already part of a company.
            </p>
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Users</SelectLabel>
                  {availableUsers?.map((availableUser) => (
                    <SelectItem key={availableUser.id} value={availableUser.id}>
                      {availableUser.name} - {availableUser.email}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              className="justify-right"
              disabled={!selectedUserId}
              onClick={async () => {
                if (selectedUserId) {
                  await addUserToCompany(selectedUserId, company.id);
                  setAddUserOpen(false);
                  setSelectedUserId("");

                  // Refresh the page but stay on users tab
                  router.push(`/admin/companies/${company.id}?tab=users`);
                  router.refresh();
                }
              }}
            >
              Add User
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function CompanyInfoSettingsTab({ company }: CompanyInfoProps) {
  const router = useRouter();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  const handleDialogChange = (open: boolean) => {
    setConfirmOpen(open);
    if (!open) {
      setConfirmationText(""); // Clear input when dialog closes
    }
  };

  async function handleCompanyDelete(id: string) {
    setDeleteLoading(true);

    try {
      await deleteCompany(id);
      router.push("/admin/companies");
      toast.success("Company Deleted!");
      setConfirmOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "You cannot delete this company!") {
          toast.error("You cannot delete this company!");
          console.log("If company is deleted, whole system will fail.");
        } else if (error.message === "Company not found") {
          toast.error("Company not found!");
        } else if (error.message.includes("associated users")) {
          toast.error("Cannot delete company with users. Remove users first.");
        } else {
          toast.error("Error deleting company!");
        }
      } else {
        toast.error("Error deleting company!");
      }
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
            <div>
              <h3 className="font-medium">Delete Company</h3>
              <p className="text-sm text-muted-foreground">
                Permanently delete this company and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
              Delete Company
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirm Dialog */}
      <Dialog open={confirmOpen} onOpenChange={handleDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Company Delete</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>
              Are you sure you would like to{" "}
              <span className="font-semibold">permanently delete</span> this
              company, all of its data and user connections
            </p>
            <p>"{company.name}"</p>
            <p>This action cannot be undone.</p>
          </div>
          <Input
            placeholder="Type 'Permanently Delete' to delete this company."
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
          />
          <Button
            variant="destructive"
            onClick={() => handleCompanyDelete(company.id)}
            disabled={
              confirmationText !== "Permanently Delete" || deleteLoading
            }
          >
            {deleteLoading ? (
              <div className="flex gap-1 items-center">
                <Loader2 className="animate-spin" />
                Deleting
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
