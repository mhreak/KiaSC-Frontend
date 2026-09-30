"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import React, { useRef, useState } from "react";
import { athleteListFilterConfig } from "./athleteListFilterConfig";
import { DataTable } from "@/components/ui/data-table/data-table";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";
import { athleteListFormConfig } from "./athleteListFormConfig";
import { Athlete } from "@/types/api/endpointTypes/athlete.types";
import { ColumnDef } from "@tanstack/react-table";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import ActionItems from "@/components/shared/ActionItems";
import { FormMode } from "@/components/formBuilder/types";
import { useTransitionRouter } from "next-view-transitions";

const sampleData: Athlete[] = [
  {
    id: "ivsjekflisjdjj-aejfaek",
    fullNama: "محمد هادی رادان",
    fatherName: "محمد تقی",
    nationalCole: "1272244581",
    gender: 2,
    genderStr: "مرد",
    ageGroup: "",
  },
];

export default function AthleteListPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const router = useTransitionRouter();

  const athleteColumns: ColumnDef<Athlete>[] = [
    {
      accessorKey: "fullNama",
      header: "نام و نام خانوادگی",
    },
    {
      accessorKey: "fatherName",
      header: "نام پدر",
    },
    {
      accessorKey: "nationalCole",
      header: "کد ملی",
      meta: {
        formatter: numberFormatter,
      },
    },

    {
      accessorKey: "genderStr",
      header: "جنسیت",
    },
    {
      accessorKey: "ageGroup",
      header: "گروه سنی",
    },
    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onEdit={() => {
            setFormMode("edit");

            formDrawerRef.current?.open();
          }}
          onView={() => {
            router.push(`/athlete-list/athlete-details/${row.original.id}`);
          }}
          onDelete={() => {}}
        />
      ),
    },
  ];
  return (
    <div className="space-y-5">
      <FilterRenderer
        config={athleteListFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable columns={athleteColumns} data={sampleData} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={athleteListFormConfig}
            drawerTitle="ورزشکار"
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
