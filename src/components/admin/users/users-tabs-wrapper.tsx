"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/generated/prisma";
import {
  UserInfoOverviewTab,
  UserInfoSettingsTab,
} from "@/components/admin/users/users-info";

interface UsersTabsWrapperProps {
  initialTab: string;
  selectedUser: User & { company?: any; profile?: any };
  allUsers: User[];
  currentUser: any;
}

export function UsersTabsWrapper({
  initialTab,
  selectedUser,
  allUsers,
  currentUser,
}: UsersTabsWrapperProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);

    const params = new URLSearchParams(searchParams);
    params.set("tab", newTab);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const urlTab = searchParams.get("tab") || "overview";
    if (urlTab !== activeTab) {
      setActiveTab(urlTab);
    }
  }, [searchParams, activeTab]);

  const validTabs = ["overview", "settings"];
  const safeActiveTab = validTabs.includes(activeTab) ? activeTab : "overview";

  return (
    <Tabs value={safeActiveTab} onValueChange={handleTabChange} className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <UserInfoOverviewTab selectedUser={selectedUser} />
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <UserInfoSettingsTab selectedUser={selectedUser} />
      </TabsContent>
    </Tabs>
  );
}
