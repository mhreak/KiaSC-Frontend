"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Sport } from "@/types/api/endpointTypes/sport.types";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { sportFormConfig } from "./sportFormConfig";

const sampleData: Sport[] = [
  {
    id: "guoir-dhskj",
    name: "فوتبالی",
  },
];

export default function SportPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const athleteColumns: ColumnDef<Sport>[] = [
    {
      accessorKey: "name",
      header: "نام رشته ورزشی",
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
        />
      ),
    },
  ];
  return (
    <div className="space-y-5">
      <DataTable columns={athleteColumns} data={sampleData} />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={sportFormConfig}
            drawerTitle="رشته ورزشی"
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
