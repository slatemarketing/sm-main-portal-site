import { ReactNode } from "react";
// import { MainLayout } from "./MainLayout";

interface AdminPortalLayoutProps {
  children: ReactNode;
}

export function AdminPortalLayout({ children }: AdminPortalLayoutProps) {
  return (
    // <MainLayout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
    // </MainLayout>
  );
}
