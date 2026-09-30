"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { FileChartColumn } from "lucide-react";
import React, { useRef, useState } from "react";
import { personListFormConfig } from "./personListFormConfig";
import { Person } from "@/types/api/endpointTypes/person.types";
import ActionItems from "@/components/shared/ActionItems";
import { ColumnDef } from "@tanstack/react-table";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import { FormMode } from "@/components/formBuilder/types";
import { useTransitionRouter } from "next-view-transitions";

const sampleData: Person[] = [
  {
    id: "iurusdknk-aejfaek",
    fullNama: "محمد هادی رادان",
    fatherName: "محمد تقی",
    nationalCole: "1272244581",
    gender: 2,
    genderStr: "مرد",
    ageGroup: "",
  },
];

export default function PersonListPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const router = useTransitionRouter();
  const personColumns: ColumnDef<Person>[] = [
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
            router.push(`/person-list/person-details/${row.original.id}`);
          }}
          onDelete={() => {}}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable columns={personColumns} data={sampleData} />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer formConfig={personListFormConfig} drawerTitle="فرد" />
          <Button variant={"warning"}>
            <FileChartColumn />
            دانلود فایل اکسل
          </Button>
        </div>
      </div>
    </div>
  );
}
