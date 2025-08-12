"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "@/generated/prisma";
import { UserRoleSelector } from "@/components/admin/users/user-role-selector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Info, Mail, Shield, User as UserIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

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
  const [userDataOpen, setUserDataOpen] = useState(false);

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
                    <h3 className="font-medium">User Actions</h3>
                    <p className="text-sm text-muted-foreground">
                      Additional user management actions coming soon
                    </p>
                  </div>
                  <Button disabled>Coming Soon</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
