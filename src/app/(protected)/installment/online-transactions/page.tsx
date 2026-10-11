"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useRef, useState } from "react";
import { OnlineTransaction } from "@/types/api/endpointTypes/installment.types";
import {
  currencyFormatter,
  dateFormatter,
} from "@/components/ui/data-table/formatters";
import { onlineTransactionsFilterConfig } from "./onlineTransactionsFilterConfig";

const sampleData: OnlineTransaction[] = [
  {
    id: "ethdfh-aejfaek",
    athleteName: "مهدی مهدوی",
    course: "24 جلسه فوتبال",
    date: "2026-10-23",
    status: "success",
    price: 12000000,
    trackingNumber: 0,
    description: "شرح",
  },
];

export default function OnlineTransactionsPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const router = useTransitionRouter();

  const onlineTransactionsColumns: ColumnDef<OnlineTransaction>[] = [
    {
      accessorKey: "athleteName",
      header: "ورزش آموز",
    },
    {
      accessorKey: "course",
      header: "دورۀ آموزشی",
    },

    {
      accessorKey: "price",
      header: "مبلغ",
      meta: {
        formatter: currencyFormatter,
      },
    },
    {
      accessorKey: "status",
      header: "وضعیت",
      cell: ({ row }) => {
        switch (row.original.status) {
          case "success":
            return "موفق";
          case "failed":
            return "ناموفق";
        }
      },
    },
    {
      accessorKey: "date",
      header: "تاریخ ثبت",
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
          onView={() => {
            router.push(
              `/installment/online-transactions/transaction-details/${row.original.id}}`,
            );
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={onlineTransactionsFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable
        columns={onlineTransactionsColumns}
        data={sampleData}
        mode="filter"
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <Button variant={"warning"}>
            <FileChartColumn />
            دانلود فایل اکسل
          </Button>
        </div>
      </div>
    </div>
  );
}
