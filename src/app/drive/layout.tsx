import React from "react";
import { DashboardSidebar } from "~/components/dashboard/sidebar";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import DashboardTopbar from "~/components/dashboard/topbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar></DashboardSidebar>
        <SidebarInset>
          <DashboardTopbar>
            <main>{children}</main>
          </DashboardTopbar>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
