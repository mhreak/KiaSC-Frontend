import { Home, Search, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  link: string;
  activeIcon?: React.ReactNode;
}

export const navItems: NavItem[] = [
  {
    id: "home",
    label: "خانه",
    link: "/home",
    icon: <Home size={24} />,
    activeIcon: (
      <div className="text-primary-light bg-clip-text bg-linear-to-r from-primary-light to-primary">
        <Home size={24} />
      </div>
    ),
  },
  {
    id: "search",
    label: "جستجو",
    link: "/search",
    icon: <Search size={24} />,
    activeIcon: (
      <div className="text-primary-light bg-clip-text bg-linear-to-r from-primary-light to-primary">
        <Search size={24} />
      </div>
    ),
  },
  {
    id: "assistant",
    label: "دستیار هوشمند",
    link: "/ai-assistant",
    icon: (
      <div className="relative -mt-12 aspect-square size-19 lg:size-10 lg:mt-0">
        <Image
          src="/images/orb-symbol.png"
          alt="دستیار هوشمند"
          fill
          className="object-contain"
        />
      </div>
    ),
    activeIcon: (
      <motion.div
        className="relative -mt-12 aspect-square size-19 lg:size-10 lg:mt-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src="/images/orb-symbol.png"
          alt="دستیار هوشمند"
          width={98}
          height={98}
          className="object-contain "
        />
        {/* حلقه نورانی دور عکس */}
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-primary-lighter to-primary opacity-20 blur-md -z-10" />
      </motion.div>
    ),
  },
  {
    id: "cart",
    label: "سبدخرید",
    link: "/cart",
    icon: <ShoppingBag size={24} />,
    activeIcon: (
      <div className="text-primary-light bg-clip-text bg-linear-to-r from-primary-light to-primary">
        <ShoppingBag size={24} />
      </div>
    ),
  },
  {
    id: "profile",
    label: "پروفایل",
    link: "/profile",
    icon: <User size={24} />,
    activeIcon: (
      <div className="text-primary-light bg-clip-text bg-linear-to-r from-primary-light to-primary">
        <User size={24} />
      </div>
    ),
  },
];
