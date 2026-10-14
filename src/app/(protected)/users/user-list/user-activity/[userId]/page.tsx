"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { dateFormatter } from "@/components/ui/data-table/formatters";
import BackButton from "@/components/shared/BackButton";
import { UserActivity } from "@/types/api/endpointTypes/users.types";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { userActivityFilterConfig } from "./userActivityFilterConfig";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";

const sampleData: UserActivity[] = [
  {
    id: "ethdfh-aejfaek",
    title: "مشاهده فعالیت کاربر",
    description: "شرح فعالیت",
    createdAt: "12-12-2006",
  },
];

export default function UserActivityPage() {
  const userActivitiesColumns: ColumnDef<UserActivity>[] = [
    {
      accessorKey: "title",
      header: "عنوان فعالیت",
    },
    {
      accessorKey: "createdAt",
      header: "زمان ثبت فعالیت",
      meta: {
        formatter: dateFormatter,
      },
    },
    {
      accessorKey: "description",
      header: "شرح فعالیت",
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={userActivityFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable
        columns={userActivitiesColumns}
        data={sampleData}
        mode="filter"
      />
      <div className="flex-between">
        <div className="w-full flex flex-row items-center justify-between gap-5">
          <Button variant={"warning"}>
            <FileChartColumn />
            دانلود فایل اکسل
          </Button>
          <BackButton />
        </div>
      </div>
    </div>
  );
}
