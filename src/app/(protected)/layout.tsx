import AuthGuard from "@/components/auth/AuthGuard";
import NavBar from "@/components/navbar/NavBar";
import AppSideBar from "@/components/sidebar/AppSideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <AuthGuard>
    <SidebarProvider>
      <div className="relative flex h-dvh w-full">
        <AppSideBar />
        <SidebarInset className="flex flex-col min-w-0">
          <div className="flex flex-row min-w-0">
            <NavBar />
          </div>
          <div className="p-8 h-full overflow-auto min-w-0">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
    // </AuthGuard>
  );
}
