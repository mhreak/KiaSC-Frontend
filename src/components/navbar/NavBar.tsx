import React from "react";
import ProfileAvatar from "./ProfileAvatar";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import AppBreadcrumb from "../AppBreadcrumb";

const NavBar = () => {
  return (
    <header className="flex flex-row gap-8 h-fit shrink-0 items-center  rounded-xl px-4 py-3">
      <AppBreadcrumb />
    </header>
  );
};

export default NavBar;
