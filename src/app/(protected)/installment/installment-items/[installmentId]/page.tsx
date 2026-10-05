"use client";

import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useTransitionRouter } from "next-view-transitions";
import { useRef } from "react";
import { InstallmentItem } from "@/types/api/endpointTypes/installment.types";
import { currencyFormatter } from "@/components/ui/data-table/formatters";
import BackButton from "@/components/shared/BackButton";
import {
  installmentAddItemFormConfig,
  installmentEditItemFormConfig,
} from "./installmentItemFormConfig";

const sampleData: InstallmentItem[] = [
  {
    id: "ethdfh-aejfaek",
    for: "پیراهن",
    price: 300000,
  },
];

export default function InstallmentPage() {
  const addFormDrawerRef = useRef<FormDrawerRef>(null);
  const editFormDrawerRef = useRef<FormDrawerRef>(null);

  const router = useTransitionRouter();

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
            editFormDrawerRef.current?.open();
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
            ref={addFormDrawerRef}
            formConfig={installmentAddItemFormConfig}
            drawerTitle="آیتم جدید"
            formMode="add"
          />
          <FormDrawer
            ref={editFormDrawerRef}
            formConfig={installmentEditItemFormConfig}
            drawerTitle="آیتم قسط"
            showTriggerButton={false}
            formMode="edit"
          />

          <BackButton />
        </div>
      </div>
    </div>
  );
}
