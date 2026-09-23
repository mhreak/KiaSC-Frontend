import {
  Home,
  LinkIcon,
  Package2,
  PieChart,
  Sparkles,
  Users,
} from "lucide-react";
import { SideBarItem } from "./type";
import { SIDEBAR_ITEM_LINKS } from "./sidebarItemsLinks";

export const SIDEBAR_ITEMS: SideBarItem[] = [
  {
    id: "home",
    title: "پیشخوان",
    icon: <Home className="size-4" />,
    link: SIDEBAR_ITEM_LINKS.home,
  },
  {
    id: "athletes",
    title: "ورزشکاران",
    icon: <Package2 className="size-4" />,
    link: "/athlete-list",
    subs: [
      {
        title: "لیست ورزشکاران",
        link: "/athlete-list",
        icon: <Package2 className="size-4" />,
      },
      {
        title: "گزارش ساز اکسل",
        link: "/projects",
        icon: <LinkIcon className="size-4" />,
      },
      {
        title: "فایل ها",
        link: "/projects",
        icon: <LinkIcon className="size-4" />,
      },
    ],
  },
  {
    id: "people",
    title: "افراد",
    icon: <PieChart className="size-4" />,
    link: "#",
    subs: [
      {
        title: "لیست افراد",
        link: "/projects",
        icon: <LinkIcon className="size-4" />,
      },
      {
        title: "گزارش ساز اکسل",
        link: "/projects",
        icon: <LinkIcon className="size-4" />,
      },
      {
        title: "فایل ها",
        link: "/projects",
        icon: <LinkIcon className="size-4" />,
      },
    ],
  },
  {
    id: "benefits",
    title: "بیمه",
    icon: <Sparkles className="size-4" />,
    link: "#",
    subs: [
      {
        title: "لیست بیمه ورزشکاران",
        link: "/projects",
        icon: <LinkIcon className="size-4" />,
      },
      {
        title: "بیمه های نزدیک به انقضا",
        link: "/projects",
        icon: <LinkIcon className="size-4" />,
      },
    ],
  },
  {
    id: "marketing",
    title: "دوره ها",
    icon: <Users className="size-4" />,
    link: "#",
    subs: [
      {
        title: "لیست دوره ها",
        link: "#",
      },
      {
        title: "ثبت نام",
        link: "#",
      },
    ],
  },
  {
    id: "finance",
    title: "امور مالی",
    icon: <Users className="size-4" />,
    link: "#",
    subs: [
      {
        title: "لیست اقساط",
        link: "#",
      },
      {
        title: "تراکنش های آنلاین",
        link: "#",
      },
      {
        title: "گزارش مالی",
        link: "#",
      },
    ],
  },
  {
    id: "wallet",
    title: "کیف پول",
    icon: <Users className="size-4" />,
    link: "#",
    subs: [
      {
        title: "کیف پول ورزشکاران",
        link: "#",
      },
      {
        title: "کیف پول افراد",
        link: "#",
      },
      {
        title: "پاداش معرفی (ورزشکاران)",
        link: "#",
      },
      {
        title: "پاداش معرفی (افراد)",
        link: "#",
      },
      {
        title: "کیف پول های ویژه",
        link: "#",
      },
    ],
  },
  {
    id: "message",
    title: "پیام رسانی",
    icon: <Users className="size-4" />,
    link: "#",
    subs: [
      {
        title: "پیام های عمومی",
        link: "#",
      },
      {
        title: "پیام های خصوصی",
        link: "#",
      },
      {
        title: "پیام کوتاه",
        link: "#",
      },
    ],
  },
];
