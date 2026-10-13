"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";

import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { Guild } from "@/types/api/endpointTypes/guild.types";
import { guilsFormConfig } from "./guilsFormConfig";

const sampleData: Guild[] = [
  {
    id: "ritujelkf-dhfgsdskj",
    name: "پوشاک و لوازم ورزشی",
  },
];

export default function GuildsPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const tableColumns: ColumnDef<Guild>[] = [
    {
      accessorKey: "name",
      header: "نام صنف",
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
      <DataTable columns={tableColumns} data={sampleData} />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={guilsFormConfig}
            drawerTitle="صنف"
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
