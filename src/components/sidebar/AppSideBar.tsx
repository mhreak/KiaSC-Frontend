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
import Image from "next/image";
import { Link } from "next-view-transitions";

const AppSideBar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" variant="floating" dir="rtl" side="right">
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat leftside-menu rounded-xl m-2",
        )}
        aria-hidden="true"
      />
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-center",
        )}
      >
        <Link className="flex items-center gap-2 z-100" href="/">
          {!isCollapsed ? (
            // <span className="font-bold text-sidebar-foreground text-xl dark:text-white">
            //   موسسه کیاسرخ هور
            // </span>
            <div className="relative aspect-square size-34 z-100">
              <Image src={"/kiasc-logo.png"} alt="موسسه کیاسرخ هور" fill />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span>KiaSC</span>
              <div className="relative aspect-square size-10 z-100">
                <Image src={"/kiasc-logo.png"} alt="موسسه کیاسرخ هور" fill />
              </div>
            </div>
          )}
        </Link>

        {/* <motion.div
          animate={{ opacity: 1 }}
          className={cn(
            "flex items-center gap-2",
            isCollapsed ? "flex-row md:flex-col-reverse" : "flex-row",
          )}
          initial={{ opacity: 0 }}
          key={isCollapsed ? "header-collapsed" : "header-expanded"}
          transition={{ duration: 0.8 }}
        >
       
          <SidebarTrigger
            render={
              <Button size={"icon"} variant={"outline"}>
                <Menu />
              </Button>
            }
          />
        </motion.div> */}
      </SidebarHeader>
      <SidebarContent className="gap-4 px-2 py-4 items-center">
        <AppNavigatoin />
      </SidebarContent>
      <SidebarFooter className="px-2"></SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
