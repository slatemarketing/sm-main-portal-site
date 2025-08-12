"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/generated/prisma";
import { updateUserRole } from "@/actions/users";

interface UserRoleSelectorProps {
  userId: string;
  currentRole: UserRole;
}

export function UserRoleSelector({
  userId,
  currentRole,
}: UserRoleSelectorProps) {
  const [role, setRole] = useState(currentRole);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRoleChange = async (newRole: UserRole) => {
    setIsUpdating(true);
    try {
      await updateUserRole(userId, newRole);
      setRole(newRole);
      toast.success(`User role updated to ${newRole}`);

      window.location.reload();
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    } finally {
      setIsUpdating(false);
    }
  };

  const getRoleVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return "default";
      case UserRole.CLIENT:
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-2">
      <Select
        value={role}
        onValueChange={(value) => handleRoleChange(value as UserRole)}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          {[UserRole.CLIENT, UserRole.ADMIN].map((roleOption) => (
            <SelectItem key={roleOption} value={roleOption}>
              <div className="flex items-center gap-2">
                <Badge
                  variant={getRoleVariant(roleOption)}
                  className="text-xs"
                >
                  {roleOption}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isUpdating && (
        <p className="text-xs text-muted-foreground">Updating role...</p>
      )}
    </div>
  );
}
