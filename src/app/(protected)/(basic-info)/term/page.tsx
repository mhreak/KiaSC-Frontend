"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { Term } from "@/types/api/endpointTypes/term.types";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import { termFormConfig } from "./termFormConfig";

const sampleData: Term[] = [
  {
    id: "ritujelkf-dhfgsdskj",
    name: "پاییز",
    year: 1400,
    season: "پاییز",
  },
];

export default function TermsPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const tableColumns: ColumnDef<Term>[] = [
    {
      accessorKey: "name",
      header: "نام ترم",
    },
    {
      accessorKey: "year",
      header: "سال",
      meta: {
        formatter: numberFormatter,
      },
    },
    {
      accessorKey: "season",
      header: "فصل",
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
        />
      ),
    },
  ];
  return (
    <div className="space-y-5">
      <DataTable columns={tableColumns} data={sampleData} />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={termFormConfig}
            drawerTitle="ترم"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
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
