"use client";

import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import ImageLableCard, {
  ImageLableCardProps,
} from "@/components/shared/ImageLableCard";
import { useParams } from "next/navigation";
import React, { useRef } from "react";
import { courseFormConfig } from "../../courseFormConfig";
import BackButton from "@/components/shared/BackButton";

export default function CourseDetailsPage() {
  const { courseId } = useParams<{ courseId: string }>();

  const formDrawerRef = useRef<FormDrawerRef>(null);

  const items: ImageLableCardProps[] = [
    {
      imageSrc: "/icon/ic-edit.png",
      label: "ویرایش",
      themeColor: "amber",
      onClick: () => {
        formDrawerRef.current?.open();
      },
    },
    {
      imageSrc: "/icon/ic-course-session.png",
      label: "جلسات",
      themeColor: "emerald",
    },
    {
      imageSrc: "/icon/ic-options.png",
      label: "گزینه های ثبت نامی",
      themeColor: "blue",
    },
    {
      imageSrc: "/icon/ic-athlete.png",
      label: "ورزش آموزان",
      themeColor: "red",
    },
    {
      imageSrc: "/icon/ic-coach.png",
      label: "افراد",
      themeColor: "yellow",
    },
    {
      imageSrc: "/icon/ic-chart.png",
      label: "گزارش مالی",
      themeColor: "fuchsia",
    },
    {
      imageSrc: "/icon/ic-team.png",
      label: "کلاس ها",
      themeColor: "teal",
    },
    {
      imageSrc: "/icon/ic-attendance.png",
      label: "فعالیت ورزش آموزان",
      themeColor: "orange",
    },
    {
      imageSrc: "/icon/ic-file.png",
      label: "گزارش جامع",
      themeColor: "cyan",
    },
    {
      imageSrc: "/icon/ic-file.png",
      label: "گزارش گزینه ثبت نام",
      themeColor: "indigo",
    },
  ];

  return (
    <>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {items.map((item) => (
          <ImageLableCard key={item.label} {...item} />
        ))}
        <FormDrawer
          ref={formDrawerRef}
          formConfig={courseFormConfig}
          drawerTitle="دوره"
          formMode="edit"
          showTriggerButton={false}
        />
      </div>
      <div className="pl-8 flex justify-end">
        <BackButton />
      </div>
    </>
  );
}
