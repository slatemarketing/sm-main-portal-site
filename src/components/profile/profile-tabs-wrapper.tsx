"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function ProfileTabsWrapper() {
  return (
    <Tabs defaultValue="general">
      <TabsList className="w-full">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="general">General</TabsContent>
      <TabsContent value="security">Security</TabsContent>
      <TabsContent value="notifications">Notifications</TabsContent>
      <TabsContent value="activity">Activity</TabsContent>
    </Tabs>
  );
}
