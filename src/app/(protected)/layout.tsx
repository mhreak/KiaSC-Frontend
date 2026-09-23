import AuthGuard from "@/components/auth/AuthGuard";
import NavBar from "@/components/navbar/NavBar";
import AppSideBar from "@/components/sidebar/AppSideBar";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import React from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <AuthGuard>
    <SidebarProvider
      className="p-2 bg-muted"
      style={{ "--sidebar-width": "230px" } as React.CSSProperties}
    >
      <AppSideBar />
      {/* ---------------- Main ---------------- */}
      <div className="flex flex-1 flex-col gap-4">
        <NavBar />
        <main
          className="flex-1 h-full overflow-auto rounded-xl bg-background shadow-sm p-5"
          style={{ viewTransitionName: "page-content" }}
        >
          {children}
        </main>
      </div>
      {/* <div className="relative flex h-dvh w-full">
        <AppSideBar />
        <SidebarInset className="flex flex-col min-w-0">
          <div className="flex flex-row min-w-0">
            <NavBar />
          </div>
          <div className="p-8 h-full overflow-auto min-w-0">{children}</div>
        </SidebarInset>
      </div> */}
    </SidebarProvider>
    // </AuthGuard>
  );
}
