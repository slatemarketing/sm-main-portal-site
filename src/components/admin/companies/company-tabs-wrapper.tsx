"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Company, User } from "@/generated/prisma";
import {
  CompanyInfoOverviewTab,
  CompanyInfoSettingsTab,
  CompanyInfoUsersTab,
} from "@/components/admin/companies/company-info";

interface CompanyTabsWrapperProps {
  initialTab: string;
  company: Company & { users: any[] };
  allUsers: User[];
  availableUsers: User[];
  user: any;
}

export function CompanyTabsWrapper({
  initialTab,
  company,
  allUsers,
  availableUsers,
  user,
}: CompanyTabsWrapperProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle tab changes
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);

    // Update URL without page reload
    const params = new URLSearchParams(searchParams);
    params.set("tab", newTab);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Sync state if URL changes (browser back/forward)
  useEffect(() => {
    const urlTab = searchParams.get("tab") || "overview";
    if (urlTab !== activeTab) {
      setActiveTab(urlTab);
    }
  }, [searchParams, activeTab]);

  // Validate tab names
  const validTabs = ["overview", "users", "settings"];
  const safeActiveTab = validTabs.includes(activeTab) ? activeTab : "overview";

  return (
    <Tabs value={safeActiveTab} onValueChange={handleTabChange} className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="users">Users ({company.users.length})</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <CompanyInfoOverviewTab company={company} />
      </TabsContent>

      <TabsContent value="users" className="space-y-6">
        <CompanyInfoUsersTab
          company={company}
          allUsers={allUsers}
          availableUsers={availableUsers}
          user={user}
        />
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <CompanyInfoSettingsTab company={company} />
      </TabsContent>
    </Tabs>
  );
}
