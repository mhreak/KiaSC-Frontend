"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Course } from "@/types/api/endpointTypes/course.types";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import React, { useRef, useState } from "react";
import { courseFormConfig } from "./courseFormConfig";
import { courseFilterConfig } from "./courseFilterConfig";

const sampleData: Course[] = [
  {
    id: "ethdfh-aejfaek",
    courseName: "پاییز و زمستان ۱۴۰۵",
    term: "پاییز و زمستان",
    sport: "فوتبال",
    genderStr: "مرد",
  },
];

export default function CoursesPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const router = useTransitionRouter();

  const athleteColumns: ColumnDef<Course>[] = [
    {
      accessorKey: "courseName",
      header: "نام دوره آموزشی",
    },
    {
      accessorKey: "term",
      header: "ترم",
    },

    {
      accessorKey: "sport",
      header: "رشته ورزشی",
    },
    {
      accessorKey: "genderStr",
      header: "جنسیت",
    },
    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onView={() => {
            router.push(
              `/courses/course-details/${row.original.id}?name=${"منوی دسترسی " + row.original.courseName}`,
            );
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer config={courseFilterConfig} onApplyFilters={() => {}} />
      <DataTable columns={athleteColumns} data={sampleData} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={courseFormConfig}
            drawerTitle="دوره"
          />
          <Button variant={"warning"}>
            <FileChartColumn />
            دانلود فایل اکسل
          </Button>
        </div>
      </div>
    </div>
  );
}
