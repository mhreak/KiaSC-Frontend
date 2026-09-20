"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { cn } from "@/lib/utils";
import { navItems } from "@/components/bottomNavigation/navItems";
import SearchInput from "@/components/shared/inputs/SearchInput";
import ProfileAvatar from "./ProfileAvatar";
import { Button } from "../ui/button";
import { Bot } from "lucide-react";

const DesktopHeader = () => {
  const pathname = usePathname();
  const activeTab = pathname.split("/")[1];

  return (
    <header className="sticky top-0 z-50 hidden w-full border-b border-border bg-background/80 backdrop-blur-lg lg:block">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-8 px-8">
        <Link href="/home" className="flex shrink-0 items-center gap-2">
          <Image
            src="/images/bodokado-logo.png"
            width={40}
            height={40}
            alt="bodokado-logo"
          />
          <span className="text-xl font-semibold">بدو کادو</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <Link
                key={item.id}
                href={item.link}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-lighter text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mx-auto w-full max-w-md">
          <SearchInput
            value=""
            onChange={() => {}}
            placeholder="جستجو"
            className="rounded-full bg-input"
          />
        </div>
        <Link href={"/ai-assistant/gift-assistant"}>
          <Button
            variant={"gradient"}
            size={"icon-lg"}
            className="[&_svg:not([class*='size-'])]:size-8"
          >
            <Bot className="text-primary-foreground" />
          </Button>
        </Link>
        <div className="shrink-0">
          <ProfileAvatar />
        </div>
      </div>
    </header>
  );
};

export default DesktopHeader;
