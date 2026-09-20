import InvitationCode from "@/assets/icons/InvitationCode";
import { CircleQuestionMark, Gift, Heart, ScrollText, Settings, UserPen } from "lucide-react";

export interface ProfileSettingItem {
    id: number;
    title: string;  
    description?:string;
    link:string;
    icon: React.ReactNode;
}

const iconsClassName = "text-black"

export const PROFILE_SETTING_ITEMS: ProfileSettingItem[] = [
    {
        id:1,
        title: "سفارشات من",
        link: "/profile/orders",
        icon: <ScrollText className={iconsClassName} />
    },
    {
        id:2,
        title: "علاقه مندی ها",
        link: "/profile/favorites",
        icon: <Heart className={iconsClassName}  fill="currentColor" />
    },
    {
        id:3,
        title: "مناسبت ها",
        link: "/profile/events",
        icon: <Gift className={iconsClassName} />
    },
    {
        id:4,
        title: "کد دعوت",
        description: "دریافت اعتبار",
        link: "/profile/invitation-code",
        icon: <InvitationCode className={iconsClassName}  />
    },
    {
        id:5,
        title: "ویرایش حساب",
        link: "/profile/edit-account",
        icon: <UserPen className={iconsClassName}  />
    },
    {
        id:6,
        title: "تنظیمات",
        link: "/profile/setting",
        icon: <Settings className={iconsClassName}  />
    },
    {
        id:7,
        title: "پشتیبانی",
        link: "/profile/support",
        icon: <CircleQuestionMark className={iconsClassName}  />
    },
]