"use client";

import {
  Sidebar,
  SidebarHeader,
  useSidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";
import AppNavigatoin from "./AppNavigatoin";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

const AppSideBar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" variant="inset" dir="rtl" side="right">
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between",
        )}
      >
        <a className="flex items-center gap-2" href="/">
          <div className="h-8 w-8 border rounded-2xl border-border"></div>
          {!isCollapsed && (
            <span className="font-semibold text-sidebar-foreground text-xl dark:text-white">
              کیا اسپورت
            </span>
          )}
        </a>

        <motion.div
          animate={{ opacity: 1 }}
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row",
          )}
          initial={{ opacity: 0 }}
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          transition={{ duration: 0.8 }}
        >
          {/* <NotificationsPopover notifications={sampleNotifications} /> */}
          <SidebarTrigger
            render={
              <Button size={"icon"} variant={"outline"}>
                <Menu />
              </Button>
            }
          />
        </motion.div>
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 py-4">
        <AppNavigatoin />
      </SidebarContent>
      <SidebarFooter className="px-2">
        {/* <TeamSwitcher teams={teams} /> */}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
