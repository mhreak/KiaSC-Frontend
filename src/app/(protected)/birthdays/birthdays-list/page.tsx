"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useRef } from "react";
import { dateFormatter } from "@/components/ui/data-table/formatters";
import { birthdaysListFilterConfig } from "./birthdaysListFilterConfig";
import { birthdaysListFormConfig } from "./birthdaysListFormConfig";
import { Birthday } from "@/types/api/endpointTypes/birthdays.types";

const sampleData: Birthday[] = [
  {
    id: "ethdfh-aejfaek",
    athlete: "مهدی مهدوی",
    birthDate: "2026-10-23",
    gift: "تولد",
  },
];

export default function BirthdaysListPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const birthdaysListColumns: ColumnDef<Birthday>[] = [
    {
      accessorKey: "athlete",
      header: "ورزشکار",
    },
    {
      accessorKey: "birthDate",
      header: "تاریخ تولد",
      meta: {
        formatter: dateFormatter,
      },
    },
    {
      accessorKey: "gift",
      header: "هدیه تولد",
    },
    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onEdit={() => {
            formDrawerRef.current?.open();
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={birthdaysListFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable columns={birthdaysListColumns} data={sampleData} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={birthdaysListFormConfig}
            drawerTitle="هدیه تولد ورزشکار"
            showTriggerButton={false}
            formMode="edit"
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
