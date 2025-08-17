"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "@/generated/prisma";
import { UserRoleSelector } from "@/components/admin/users/user-role-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Info,
  Loader2,
  Mail,
  Shield,
  Trash2,
  User as UserIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { deleteUser, exportUserToUser } from "@/actions/users";

interface UserInfoProps {
  selectedUser: User & { company?: any; profile?: any };
}

export function UserInfoOverviewTab({ selectedUser }: UserInfoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Role</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <UserRoleSelector
            userId={selectedUser.id}
            currentRole={selectedUser.role}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Email Status</CardTitle>
          <Mail className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Badge variant={selectedUser.emailVerified ? "default" : "secondary"}>
            {selectedUser.emailVerified ? "Verified" : "Unverified"}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Company</CardTitle>
          <Building2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            {selectedUser.company ? (
              <Link
                href={`/admin/companies/${selectedUser.company.id}`}
                className="text-accent underline"
              >
                {selectedUser.company.name}
              </Link>
            ) : (
              "No Company"
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profile</CardTitle>
          <UserIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={selectedUser.image || ""} />
              <AvatarFallback>
                {selectedUser.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{selectedUser.name}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            User Information
          </CardTitle>
          <Info className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <strong>Created:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Last Updated:</strong>{" "}
              {new Date(selectedUser.updatedAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Email:</strong> {selectedUser.email}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function UserInfoSettingsTab({ selectedUser }: UserInfoProps) {
  const router = useRouter();
  const [userDataOpen, setUserDataOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [backupLoading, setBackupLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");

  async function handleUserBackup() {
    setBackupLoading(true);

    try {
      const body = selectedUser;

      const res = await fetch("/api/upload/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      toast.success("User Backed Up!");
    } catch (error) {
      console.log("Error while backing up:", error);
      toast.error("Error backing up user! Please try again.");
    } finally {
      setBackupLoading(false);
    }
  }

  const handleExportToUser = async () => {
    try {
      const exportResult = await exportUserToUser(selectedUser.id);

      const blob = new Blob([exportResult.data], {
        type: exportResult.mimeType,
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = exportResult.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("User data exported successfully!");
    } catch (error) {
      toast.error("Failed to export user data");
      console.error("Export error:", error);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setConfirmOpen(open);
    if (!open) {
      setConfirmationText("");
    }
  };

  async function handleUserDelete(id: string) {
    setDeleteLoading(true);

    try {
      await deleteUser(id);

      try {
        const body = selectedUser;

        const res = await fetch("/api/upload/user?remove-user=true", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        toast.success("User Backed Up!");
      } catch (error) {
        console.log("Error backing up user:", error);
        toast.error("Error while backing up");
      }

      router.push("/admin/users");
      toast.success("User Deleted!");
      setConfirmOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "You cannot delete an admin user!") {
          toast.error("You cannot delete an admin user!");
        } else if (error.message === "User not found") {
          toast.error("User not found!");
        } else {
          toast.error("Error deleting user!");
        }
      } else {
        toast.error("Error deleting user!");
      }
    } finally {
      setDeleteLoading(false);
    }
  }

  async function handleUserReport() {
    setReportLoading(true);

    try {
      const res = await fetch("/api/openai/users/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedUser),
      });

      if (!res.ok) {
        throw new Error("Failed to generate report");
      }

      // Convert response to blob
      const blob = await res.blob();

      // Create download link (same pattern as handleExportToUser)
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `user-report-${
        selectedUser.name || selectedUser.id
      }.json`; // or whatever filename you want
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Report generated and downloaded successfully!");
    } catch (error) {
      console.log("Error!", error);
      toast.error("Error generating report!");
    } finally {
      setReportLoading(false);
    }
  }

  return (
    <>
      <div>
        <Card>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <div>
                  <h1 className="font-semibold text-primary">Data</h1>
                </div>
                <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                  <div>
                    <h3 className="font-medium">View User Data</h3>
                    <p className="text-sm text-muted-foreground">
                      View all user data and information
                    </p>
                  </div>
                  <Button onClick={() => setUserDataOpen(true)}>
                    View User Data
                  </Button>
                  <Dialog open={userDataOpen} onOpenChange={setUserDataOpen}>
                    <DialogContent className="w-1/2">
                      <DialogHeader>
                        <DialogTitle>
                          Data Overview - {selectedUser.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="max-h-96 w-full overflow-auto">
                        <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm font-mono whitespace-pre-wrap">
                          {JSON.stringify(selectedUser, null, 2)}
                        </pre>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                  <div>
                    <h3 className="font-medium">Export User</h3>
                    <p className="text-sm text-muted-foreground">
                      Export all user data
                    </p>
                  </div>
                  <Button onClick={handleExportToUser}>Export User</Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                  <div>
                    <h3 className="font-medium">Backup User</h3>
                    <p className="text-sm text-muted-foreground">
                      Backup all user data into a secure Slate Marketing
                      location
                    </p>
                  </div>
                  <Button onClick={handleUserBackup} disabled={backupLoading}>
                    {backupLoading ? (
                      <div className="flex items-center gap-1">
                        <Loader2 className="animate-spin" />
                        <span>Backing Up</span>
                      </div>
                    ) : (
                      "Backup User"
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-primary/20 rounded-lg">
                  <div>
                    <h3 className="font-medium">Generate User Report</h3>
                    <p className="text-sm text-muted-foreground">
                      Generate a user report using AI. This will outcome as a
                      JSON.
                    </p>
                  </div>
                  <Button onClick={handleUserReport} disabled={reportLoading}>
                    {reportLoading ? (
                      <div className="flex items-center gap-1">
                        <Loader2 className="animate-spin" />
                        <span>Generating Report</span>
                      </div>
                    ) : (
                      "Generate Report"
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <h1 className="font-semibold text-destructive">
                    Danger Zone
                  </h1>
                </div>
                <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                  <div>
                    <h3 className="font-medium">Delete User</h3>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete this user and all associated data. This
                      action has 14 days to be undone.
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => setConfirmOpen(true)}
                  >
                    Delete User
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirm Dialog */}
      <Dialog open={confirmOpen} onOpenChange={handleDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm User Delete</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <p>
              Are you sure you would like to{" "}
              <span className="font-semibold">DELETE</span> this user and all of
              their data
            </p>
            <p>"{selectedUser.name}"</p>
          </div>
          <Input
            placeholder="Type 'DELETE' to delete this user."
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
          />
          <Button
            variant="destructive"
            onClick={() => handleUserDelete(selectedUser.id)}
            disabled={confirmationText !== "DELETE" || deleteLoading}
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
          <p className="text-sm text-muted-foreground">
            There is a 14-day period until all data is deleted{" "}
            <span className="font-bold">permanently.</span>
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
