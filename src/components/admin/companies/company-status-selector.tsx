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
import { CompanyStatus } from "@/generated/prisma";
import { updateCompanyStatus } from "@/actions/companies";

interface CompanyStatusSelectorProps {
  companyId: string;
  currentStatus: CompanyStatus;
}

export function CompanyStatusSelector({
  companyId,
  currentStatus,
}: CompanyStatusSelectorProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: CompanyStatus) => {
    setIsUpdating(true);
    try {
      await updateCompanyStatus(companyId, newStatus);
      setStatus(newStatus);
      toast.success(`Company status updated to ${newStatus}`);

      // Refresh the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Error updating company status:", error);
      toast.error("Failed to update company status");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusVariant = (status: CompanyStatus) => {
    switch (status) {
      case CompanyStatus.ACTIVE:
        return "default";
      case CompanyStatus.PENDING:
        return "secondary";
      case CompanyStatus.INACTIVE:
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-2">
      {/* <Badge variant={getStatusVariant(status)}>{status}</Badge> */}
      <Select
        value={status}
        onValueChange={(value) => handleStatusChange(value as CompanyStatus)}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {[CompanyStatus.PENDING, CompanyStatus.ACTIVE, CompanyStatus.INACTIVE].map((statusOption) => (
            <SelectItem key={statusOption} value={statusOption}>
              <div className="flex items-center gap-2">
                <Badge
                  variant={getStatusVariant(statusOption)}
                  className="text-xs"
                >
                  {statusOption}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isUpdating && (
        <p className="text-xs text-muted-foreground">Updating status...</p>
      )}
    </div>
  );
}
