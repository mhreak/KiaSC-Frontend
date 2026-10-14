import { FormConfig } from "@/components/formBuilder/types";

export const personRolesFormConfig: FormConfig = [
  {
    id: "roleName",
    label: "نام نقش",
    type: "text",
    required: true,
  },
  {
    id: "sport",
    label: "رشته ورزشی",
    type: "select",
    required: true,
  },
  {
    id: "aerj;kl",
    label: "مشاهده اطلاعات ورزشکاران",
    type: "switch",
    defaultValue: true,
  },
  {
    id: "aerafhfh",
    label: "مشاهده وضعیت حضور و غیاب",
    type: "switch",
    defaultValue: true,
  },
  {
    id: "agarsejkj",
    label: "انجام حضور و غیاب",
    type: "switch",
    defaultValue: true,
  },
  {
    id: "dfigasr;lkgj",
    label: "ارسال پیام عمومی",
    type: "switch",
    defaultValue: true,
  },
  {
    id: "umn",
    label: "ارسال پیام خصوصی",
    type: "switch",
    defaultValue: true,
  },
];
