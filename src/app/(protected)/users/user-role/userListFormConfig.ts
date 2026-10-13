import { FormConfig } from "@/components/formBuilder/types";

export const userRoleFormConfig: FormConfig = [
  {
    id: "role-info",
    type: "section",
    title: "اطلاعات نقش",
    icon: "User",
    wrapperVariant: "card",
    headerClassName: "text-green-400",
    children: [
      {
        id: "name",
        label: "نقش کاربری",
        type: "text",
        required: true,
        colSpan: 6,
      },
    ],
  },
];
