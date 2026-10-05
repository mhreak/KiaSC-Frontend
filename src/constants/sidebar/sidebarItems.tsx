import {
  Cake,
  Cog,
  CreditCard,
  DollarSign,
  Home,
  LinkIcon,
  Mail,
  MessageCircleQuestionMark,
  Package2,
  Percent,
  Settings,
  ShoppingCart,
  SquarePen,
  Star,
  Tags,
  User2,
  Users,
  Volleyball,
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
    icon: <Volleyball className="size-4" />,
    link: "/athlete-list",
    subs: [
      {
        title: "لیست ورزشکاران",
        link: SIDEBAR_ITEM_LINKS.athleteList,
        icon: <Package2 className="size-4" />,
      },
      {
        title: "گزارش ساز اکسل",
        link: "#",
        icon: <LinkIcon className="size-4" />,
      },
      {
        title: "فایل ها",
        link: SIDEBAR_ITEM_LINKS.athleteFiles,
        icon: <LinkIcon className="size-4" />,
      },
    ],
  },
  {
    id: "people",
    title: "افراد",
    icon: <User2 className="size-4" />,
    link: "#",
    subs: [
      {
        title: "لیست افراد",
        link: SIDEBAR_ITEM_LINKS.personList,
        icon: <LinkIcon className="size-4" />,
      },
      {
        title: "گزارش ساز اکسل",
        link: "#",
        icon: <LinkIcon className="size-4" />,
      },
      {
        title: "فایل ها",
        link: SIDEBAR_ITEM_LINKS.personFiles,
        icon: <LinkIcon className="size-4" />,
      },
    ],
  },
  {
    id: "benefits",
    title: "بیمه",
    icon: <User2 className="size-4" />,
    link: "#",
    subs: [
      {
        title: "لیست بیمه ورزشکاران",
        link: SIDEBAR_ITEM_LINKS.athleteInsuranceList,
        icon: <LinkIcon className="size-4" />,
      },
      {
        title: "بیمه های نزدیک به انقضا",
        link: SIDEBAR_ITEM_LINKS.athleteInsuranceExpiring,
        icon: <LinkIcon className="size-4" />,
      },
    ],
  },
  {
    id: "courses",
    title: "دوره ها",
    icon: <Star className="size-4" />,
    link: SIDEBAR_ITEM_LINKS.courses,
    subs: [
      {
        title: "لیست دوره ها",
        link: SIDEBAR_ITEM_LINKS.courses,
      },
      {
        title: "ثبت نام",
        link: SIDEBAR_ITEM_LINKS.courseRegister,
      },
    ],
  },
  {
    id: "finance",
    title: "امور مالی",
    icon: <DollarSign className="size-4" />,
    link: "#",
    subs: [
      {
        title: "لیست اقساط",
        link: SIDEBAR_ITEM_LINKS.installment,
      },
      {
        title: "تراکنش های آنلاین",
        link: SIDEBAR_ITEM_LINKS.installmentOnlineTransactions,
      },
      {
        title: "گزارش مالی",
        link: SIDEBAR_ITEM_LINKS.installmentReportCourseList,
      },
    ],
  },
  {
    id: "wallet",
    title: "کیف پول",
    icon: <CreditCard className="size-4" />,
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
    icon: <Mail className="size-4" />,
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
  {
    id: "discount",
    title: "کد تخفیف",
    icon: <Percent className="size-4" />,
    link: "#",
    subs: [
      {
        title: "کد های تخفیف",
        link: "#",
      },
    ],
  },
  {
    id: "birthdate-gift",
    title: "هدیه تولد",
    icon: <Cake className="size-4" />,
    link: "#",
    subs: [
      {
        title: "تولد ها",
        link: "#",
      },
      {
        title: "هدایای تولد",
        link: "#",
      },
    ],
  },
  {
    id: "contracts",
    title: "طرف قراردادها",
    icon: <ShoppingCart className="size-4" />,
    link: "#",
    subs: [
      {
        title: "فروشگاه ها",
        link: "#",
      },
      {
        title: "محصولات / خدمات",
        link: "#",
      },
    ],
  },
  {
    id: "s;ijks",
    title: "نظرسنجی",
    icon: <MessageCircleQuestionMark className="size-4" />,
    link: "#",
    subs: [
      {
        title: "روش های آشنایی با موسسه",
        link: "#",
      },
      {
        title: "گزارش آشنایی با موسسه",
        link: "#",
      },
    ],
  },
  {
    id: "lisrwsk",
    title: "صندوق انتقاد و پیشنهاد",
    icon: <SquarePen className="size-4" />,
    link: "#",
    subs: [
      {
        title: "لیست نظرات",
        link: "#",
      },
    ],
  },
  {
    id: "users",
    title: "کاربران",
    icon: <Users className="size-4" />,
    link: "#",
    subs: [
      {
        title: "لیست کاربران",
        link: "#",
      },
      {
        title: "نقش های کاربری",
        link: "#",
      },
    ],
  },
  {
    id: "basic-info",
    title: "اطلاعات پایه",
    icon: <Tags className="size-4" />,
    link: "#",
    subs: [
      {
        title: "رشته های ورزشی",
        link: "#",
      },
      {
        title: "رده های سنی",
        link: "#",
      },
      {
        title: "ورزشگاه ها",
        link: "#",
      },
      {
        title: "ترم ها",
        link: "#",
      },
      {
        title: "تیم ها",
        link: "#",
      },
      {
        title: "نقش های ورزشکاران",
        link: "#",
      },
      {
        title: "نقش های افراد",
        link: "#",
      },
      {
        title: "اصناف",
        link: "#",
      },
      {
        title: "قالب های پیام کوتاه",
        link: "#",
      },
      {
        title: "انواع فایل",
        link: "#",
      },
      {
        title: "قالب های ارزیابی فعالیت",
        link: "#",
      },
    ],
  },
  {
    id: "settings",
    title: "تنظیمات",
    icon: <Settings className="size-4" />,
    link: "#",
    subs: [
      {
        title: "تنظیمات اصلی",
        link: "#",
      },
      {
        title: "پنل پیامک",
        link: "#",
      },
      {
        title: "اطلاع رسانی",
        link: "#",
      },
      {
        title: "شرایط و قوانین",
        link: "#",
      },
    ],
  },
  {
    id: "special-",
    title: "امکانات ویژه",
    icon: <Star className="size-4" />,
    link: "#",
    subs: [
      {
        title: "حذف کامل ورزشکار",
        link: "#",
      },
      {
        title: "حذف کامل افراد",
        link: "#",
      },
    ],
  },
  {
    id: "technical-settings",
    title: "تنظیمات فنی",
    icon: <Cog className="size-4" />,
    link: "#",
    subs: [
      {
        title: "وظایف زمان بندی شده",
        link: "#",
      },
    ],
  },
];
