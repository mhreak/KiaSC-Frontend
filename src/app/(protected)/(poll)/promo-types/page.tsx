"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import { PromoType } from "@/types/api/endpointTypes/promoType.types";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useRef, useState } from "react";
import { promoTypeFormConfig } from "./promoTypeFormConfig";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";

const sampleData: PromoType[] = [
  {
    id: "asedf-dguerj",
    name: "دوستان و آشنایان",
    status: true,
    statusStr: "فعال",
    athletCount: 855,
  },
];

export default function PromoTypesPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const router = useTransitionRouter();

  const promoTypeColumns: ColumnDef<PromoType>[] = [
    {
      accessorKey: "name",
      header: "نام",
    },
    {
      accessorKey: "statusStr",
      header: "وضعیت",
    },
    {
      accessorKey: "athletCount",
      header: "تعداد ورزشکاران",
      meta: {
        formatter: numberFormatter,
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
          otherActions={[
            {
              onClick: () => {
                router.push(`/athlete-list`);
              },
              label: "ورزشکاران",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable columns={promoTypeColumns} data={sampleData} />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={promoTypeFormConfig}
            drawerTitle="روش آشنایی با موسسه"
            formMode={formMode}
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
