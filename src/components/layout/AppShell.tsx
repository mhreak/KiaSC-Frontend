import React from "react";
import DesktopHeader from "@/components/navbar/DesktopHeader";
import BottomNavigation from "@/components/bottomNavigation/BottomNavigation";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-full flex-col">
      <DesktopHeader />
      <div className="flex-1">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default AppShell;
