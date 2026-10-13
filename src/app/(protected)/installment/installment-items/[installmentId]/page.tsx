"use client";

import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { InstallmentItem } from "@/types/api/endpointTypes/installment.types";
import { currencyFormatter } from "@/components/ui/data-table/formatters";
import BackButton from "@/components/shared/BackButton";
import { installmentItemFormConfig } from "./installmentItemFormConfig";
import { FormMode } from "@/components/formBuilder/types";

const sampleData: InstallmentItem[] = [
  {
    id: "ethdfh-aejfaek",
    for: "پیراهن",
    price: 300000,
  },
];

export default function InstallmentPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);
  const [formMode, setFormMode] = useState<FormMode>("add");

  const installmentItemsColumns: ColumnDef<InstallmentItem>[] = [
    {
      accessorKey: "for",
      header: "بابت",
    },
    {
      accessorKey: "price",
      header: "مبلغ",
      meta: {
        formatter: currencyFormatter,
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
          onDelete={() => {}}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable
        columns={installmentItemsColumns}
        data={sampleData}
        mode="filter"
      />
      <div className="flex-between">
        <div className="w-full flex flex-row items-center justify-between gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={installmentItemFormConfig}
            drawerTitle="آیتم قسط"
            formMode={formMode}
            onTriggerButtonClick={() => setFormMode("add")}
          />

          <BackButton />
        </div>
      </div>
    </div>
  );
}
