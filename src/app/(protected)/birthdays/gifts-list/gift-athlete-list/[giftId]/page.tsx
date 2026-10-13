"use client";

import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRef } from "react";
import { dateFormatter } from "@/components/ui/data-table/formatters";
import BackButton from "@/components/shared/BackButton";
import { Birthday } from "@/types/api/endpointTypes/birthdays.types";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";
import { giftAthleteListFormConfig } from "./giftAthleteListFormConfig";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { giftAthleteListFilterConfig } from "./giftAthleteListFilterConfig";

const sampleData: Birthday[] = [
  {
    id: "ethdfh-aejfaek",
    athlete: "مهدی مهدوی",
    birthDate: "12-12-2006",
    gift: "تولد",
  },
];

export default function GiftAthletesPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const giftAthletesColumns: ColumnDef<Birthday>[] = [
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
        config={giftAthleteListFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable
        columns={giftAthletesColumns}
        data={sampleData}
        mode="filter"
      />
      <div className="flex-between">
        <div className="w-full flex flex-row items-center justify-between gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={giftAthleteListFormConfig}
            drawerTitle="هدیه تولد ورزشکار"
            showTriggerButton={false}
            formMode="edit"
          />
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
