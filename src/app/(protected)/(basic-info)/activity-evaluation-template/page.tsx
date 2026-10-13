"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { ActivityEvaluationTemplate } from "@/types/api/endpointTypes/activityEvaluationTemplate.types";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { activityEvaluationTemplateFormConfig } from "./activityEvaluationTemplateFormConfig";

const sampleData: ActivityEvaluationTemplate[] = [
  {
    id: "ulhjcfgdrf-dhfgsdskj",
    title: "ارزیابی فنی پاییز و زمستان ۱۴۰۴",
    sport: "فوتبال",
    status: "فعال",
  },
];

export default function ActivityEvaluationTemplatesPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const tableColumns: ColumnDef<ActivityEvaluationTemplate>[] = [
    {
      accessorKey: "title",
      header: "عنوان",
    },
    {
      accessorKey: "sport",
      header: "رشته ورزشی",
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
            formConfig={activityEvaluationTemplateFormConfig}
            drawerTitle="قالب ارزیابی فعالیت"
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
