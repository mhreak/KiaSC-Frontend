"use client";

import { useState } from "react";
import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Squircle } from "lucide-react";
import { Link } from "next-view-transitions";
import { SIDEBAR_ITEMS } from "@/constants/sidebar/sidebarItems";
import { AnimatePresence, motion } from "framer-motion";

const AppNavigatoin = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);
  return (
    <SidebarMenu className={cn(isCollapsed && "w-fit", "gap-1")}>
      {SIDEBAR_ITEMS.map((route) => {
        const isOpen = !isCollapsed && openCollapsible === route.id;
        const hasSubRoutes = !!route.subs?.length;

        return (
          <SidebarMenuItem key={route.id}>
            {hasSubRoutes ? (
              <Collapsible
                className="w-full"
                onOpenChange={(open) =>
                  setOpenCollapsible(open ? route.id : null)
                }
                open={isOpen}
              >
                <CollapsibleTrigger
                  render={
                    <SidebarMenuButton
                      className={cn(
                        "flex w-full items-center rounded-lg px-2 transition-colors cursor-pointer",
                        isOpen
                          ? "bg-sidebar-foreground/80 text-sidebar"
                          : "text-sidebar-foreground hover:bg-sidebar-foreground/30 hover:backdrop-blur-sm",
                        isCollapsed && "justify-center",
                      )}
                    />
                  }
                >
                  {route.icon}
                  {!isCollapsed && (
                    <span className="ml-2 font-medium text-md">
                      {route.title}
                    </span>
                  )}
                  {!isCollapsed && hasSubRoutes && (
                    <span className="mr-auto">
                      {isOpen ? (
                        <ChevronUp className="size-4" />
                      ) : (
                        <ChevronDown className="size-4" />
                      )}
                    </span>
                  )}
                </CollapsibleTrigger>
                <AnimatePresence initial={false}>
                  {!isCollapsed && (
                    <CollapsibleContent>
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                        style={{
                          overflow: "hidden",
                        }}
                      >
                        <SidebarMenuSub className="my-1 ml-3.5 ">
                          {route.subs?.map((subRoute) => (
                            <SidebarMenuSubItem
                              className="h-auto"
                              key={`${route.id}-${subRoute.title}`}
                            >
                              <SidebarMenuSubButton
                                render={
                                  <Link
                                    className="flex items-center rounded-md px-2 py-1.5 font-medium text-muted-foreground text-sm hover:bg-sidebar-muted hover:text-foreground"
                                    href={subRoute.link}
                                    prefetch={true}
                                  />
                                }
                              >
                                <Squircle
                                  style={{ color: "#ffffff" }}
                                  className="hover:text-sidebar-accent "
                                />
                                <span className="ml-2 flex-1 font-medium text-xs">
                                  {subRoute.title}
                                </span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </motion.div>
                    </CollapsibleContent>
                  )}
                </AnimatePresence>
              </Collapsible>
            ) : (
              <SidebarMenuButton
                render={
                  <Link
                    className={cn(
                      "flex items-center rounded-lg px-2 text-sidebar-foreground transition-colors hover:bg-sidebar-foreground/30 hover:backdrop-blur-sm",
                      isCollapsed && "justify-center",
                    )}
                    href={route.link}
                    prefetch={true}
                  />
                }
                tooltip={route.title}
              >
                {route.icon}
                {!isCollapsed && (
                  <span className="ml-2 font-medium text-md">
                    {route.title}
                  </span>
                )}
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default AppNavigatoin;
