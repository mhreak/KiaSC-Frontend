"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import ActionItems from "@/components/shared/ActionItems";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { Course } from "@/types/api/endpointTypes/course.types";
import { courseFilterConfig } from "../../courses/courseFilterConfig";

const sampleData: Course[] = [
  {
    id: "ethdfh-aejfaek",
    courseName: "پاییز و زمستان ۱۴۰۵",
    term: "پاییز و زمستان",
    sport: "فوتبال",
    genderStr: "مرد",
  },
];

export default function ReportCourseListPage() {
  const router = useTransitionRouter();

  const reportCourseListColumns: ColumnDef<Course>[] = [
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
              `/installment/report-course-list/report-course-details/${row.original.id}`,
            );
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer config={courseFilterConfig} onApplyFilters={() => {}} />
      <DataTable
        columns={reportCourseListColumns}
        data={sampleData}
        mode="filter"
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <Button variant={"warning"}>
            <FileChartColumn />
            دانلود فایل اکسل
          </Button>
        </div>
      </div>
    </div>
  );
}
