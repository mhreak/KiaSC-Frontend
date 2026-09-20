"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { navItems } from "./navItems";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions"


const BottomNavigation = () => {
  const pathname = usePathname();
  const activeTab = pathname.split("/")[1];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-999 bg-stone-100 rounded-2xl mx-2 shadow-lg lg:hidden">
      <div className="flex items-center justify-around h-20 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <Link
              href={item.link}
              key={item.id}
              className="flex flex-col items-center justify-center gap-1 relative group"
            >
              <div className="relative">
                {isActive ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {item.activeIcon || item.icon}
                  </motion.div>
                ) : (
                  <div className="text-gray-500 group-hover:text-gray-700 transition-colors">
                    {item.icon}
                  </div>
                )}
              </div>

              <span
                className={`text-xs transition-all duration-200 ${
                  isActive
                    ? "text-primary-light bg-clip-text bg-linear-to-r from-primary-light to-primary font-medium"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
