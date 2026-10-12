"use client";

import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useRef, useState } from "react";
import { Discount } from "@/types/api/endpointTypes/discounts.types";
import { discountFormConfig } from "./discountsFormConfig";
import { FormMode } from "@/components/formBuilder/types";

const sampleData: Discount[] = [
  {
    id: "ethdfh-aejfaek",
    name: "وفاداری",
    code: "KIAVAFA",
    type: "byPrice",
  },
];

export default function DiscountsPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);
  const [formMode, setFormMode] = useState<FormMode>("add");
  const router = useTransitionRouter();

  const discountsColumns: ColumnDef<Discount>[] = [
    {
      accessorKey: "name",
      header: "نام کد",
    },
    {
      accessorKey: "code",
      header: "کد تخفیف",
    },
    {
      accessorKey: "type",
      header: "نوع",
      cell: ({ row }) => {
        switch (row.original.type) {
          case "byPrice":
            return "تخفیف مبلغ ثابت";
          case "byPercentage":
            return "تخفیف درصدی";
          case "custom":
            return "روش دلخواه";
        }
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
            formDrawerRef.current?.open();
          }}
          otherActions={[
            {
              label: "گزارش استفاده",
              onClick: () => {
                router.push(`/discounts/discount-report/${row.original.id}`);
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable columns={discountsColumns} data={sampleData} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={discountFormConfig}
            drawerTitle="کد تخفیف"
            formMode={formMode}
            onTriggerButtonClick={() => setFormMode("add")}
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
