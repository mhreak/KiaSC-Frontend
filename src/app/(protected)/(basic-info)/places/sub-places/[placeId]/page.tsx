"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { DataTable } from "@/components/ui/data-table/data-table";
import { SubPlace } from "@/types/api/endpointTypes/subPlace.types";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { subPlaceFormConfig } from "./subPlaceFormConfig";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";
import BackButton from "@/components/shared/BackButton";

const sampleData: SubPlace[] = [
  {
    id: "guoir-dhfgsdskj",
    name: "زمین یک",
    roofed: "بله",
    status: "فعال",
  },
];

export default function SubPlacePage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const tableColumns: ColumnDef<SubPlace>[] = [
    {
      accessorKey: "name",
      header: "نام زمین",
    },
    {
      accessorKey: "roofed",
      header: "مسقف",
    },
    {
      accessorKey: "status",
      header: "وضعیت",
    },

    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onEdit={() => {
            setFormMode("edit");
            formModalRef.current?.open();
          }}
          onDelete={() => {}}
        />
      ),
    },
  ];
  return (
    <div className="space-y-5">
      <DataTable columns={tableColumns} data={sampleData} />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={subPlaceFormConfig}
            drawerTitle="زمین"
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
        <BackButton />
      </div>
    </div>
  );
}
