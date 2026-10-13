"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";

import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { SmsTemplate } from "@/types/api/endpointTypes/smsTemplate.types";
import { smsTemplateFormConfig } from "./smsTemplateFormConfig";

const sampleData: SmsTemplate[] = [
  {
    id: "ritujelkf-dhfgsdskj",
    name: "ثبت نام دوره آموزشی",
  },
];

export default function SmsTemplatesPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const tableColumns: ColumnDef<SmsTemplate>[] = [
    {
      accessorKey: "name",
      header: "نام قالب",
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
            formConfig={smsTemplateFormConfig}
            drawerTitle="قالب پیام کوتاه"
            formMode={formMode}
            showTriggerButton={false}
          />
        </div>
      </div>
    </div>
  );
}
