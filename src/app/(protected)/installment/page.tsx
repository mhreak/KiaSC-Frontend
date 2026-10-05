"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useRef } from "react";
import { installmentFilterConfig } from "./installmentFilterConfig";
import { Installment } from "@/types/api/endpointTypes/installment.types";
import {
  currencyFormatter,
  dateFormatter,
} from "@/components/ui/data-table/formatters";
import {
  addInstallmentFormConfig,
  editInstallmentFormConfig,
} from "./installmentFormConfig";

const sampleData: Installment[] = [
  {
    id: "ethdfh-aejfaek",
    athlete: "مهدی مهدوی",
    term: "پاییز و زمستان",
    course: "24 جلسه فوتبال",
    dueDate: "2026-10-23",
    installmentAmount: 2000000,
    status: "settled",
    settlementDate: "2026-10-23",
  },
];

export default function InstallmentPage() {
  const addFormDrawerRef = useRef<FormDrawerRef>(null);
  const editFormDrawerRef = useRef<FormDrawerRef>(null);

  const router = useTransitionRouter();

  const installmentColumns: ColumnDef<Installment>[] = [
    {
      accessorKey: "athlete",
      header: "ورزشکار",
    },
    {
      accessorKey: "course",
      header: "دورۀ آموزشی",
    },

    {
      accessorKey: "installmentAmount",
      header: "مبلغ قسط",
      meta: {
        formatter: currencyFormatter,
      },
    },
    {
      accessorKey: "dueDate",
      header: "تاریخ سررسید",
      meta: {
        formatter: dateFormatter,
      },
    },
    {
      accessorKey: "status",
      header: "وضعیت",
      cell: ({ row }) => {
        switch (row.original.status) {
          case "settled":
            return "تسویه شده";
          case "unsettled":
            return "تسویه نشده";
          case "deleted":
            return "حذف شده";
        }
      },
    },
    {
      accessorKey: "settlementDate",
      header: "تاریخ تسویه",
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
            editFormDrawerRef.current?.open();
          }}
          otherActions={[
            {
              label: "آیتم‌های قسط",
              onClick: () => {
                router.push(
                  `/installment/installment-items/${row.original.id}`,
                );
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={installmentFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable columns={installmentColumns} data={sampleData} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={addFormDrawerRef}
            formConfig={addInstallmentFormConfig}
            drawerTitle="اقساط"
            formMode="add"
          />
          <FormDrawer
            ref={editFormDrawerRef}
            formConfig={editInstallmentFormConfig}
            drawerTitle="اقساط"
            showTriggerButton={false}
            formMode="edit"
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
