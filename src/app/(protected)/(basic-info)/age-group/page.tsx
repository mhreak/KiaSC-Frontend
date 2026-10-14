"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { DataTable } from "@/components/ui/data-table/data-table";
import { dateFormatter } from "@/components/ui/data-table/formatters";
import { AgeGroup } from "@/types/api/endpointTypes/ageGroup.types";
import { Sport } from "@/types/api/endpointTypes/sport.types";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { ageGroupFormConfig } from "./ageGroupFormConfig";

const sampleData: AgeGroup[] = [
  {
    id: "guoir-dhfgsdskj",
    name: "زیر ۹ سال",
    startDate: "2025-01-20",
    endDate: "2025-11-20",
  },
];

export default function AgeGroupPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const tableColumns: ColumnDef<AgeGroup>[] = [
    {
      accessorKey: "name",
      header: "نام رده سنی",
    },
    {
      accessorKey: "startDate",
      header: "تاریخ آغاز",
      meta: {
        formatter: dateFormatter,
      },
    },
    {
      accessorKey: "endDate",
      header: "تاریخ پایان",
      meta: {
        formatter: dateFormatter,
      },
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
            formConfig={ageGroupFormConfig}
            drawerTitle="رده سنی"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
          />
        </div>
      </div>
    </div>
  );
}
