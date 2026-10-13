"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { currencyFormatter } from "@/components/ui/data-table/formatters";
import BackButton from "@/components/shared/BackButton";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";
import { DiscountReport } from "@/types/api/endpointTypes/discounts.types";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { discountReportFilterConfig } from "./discountReportFilterConfig";

const sampleData: DiscountReport[] = [
  {
    id: "ethdfh-aejfaek",
    athlete: "مهدی مهدوی",
    course: "فوتبال پسران بهار و تابستان 1401",
    status: "submitted",
    discountAmount: 6000000,
    finalPrice: 10000000,
  },
];

export default function DiscountReportPage() {
  const discountReportColumns: ColumnDef<DiscountReport>[] = [
    {
      accessorKey: "athlete",
      header: "ورزشکار",
    },
    {
      accessorKey: "course",
      header: "دورۀ آموزشی",
    },
    {
      accessorKey: "status",
      header: "وضعیت ثبت نام",
      cell: ({ row }) => {
        switch (row.original.status) {
          case "removed":
            return "حذف شده";
          case "submitting":
            return "در حال ثبت نام";
          case "submitted":
            return "ثبت نام نهایی";
        }
      },
    },
    {
      accessorKey: "discountAmount",
      header: "تخفیف",
      meta: {
        formatter: currencyFormatter,
      },
    },
    {
      accessorKey: "finalPrice",
      header: "هزینۀ نهایی",
      meta: {
        formatter: currencyFormatter,
      },
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={discountReportFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable
        columns={discountReportColumns}
        data={sampleData}
        mode="filter"
      />
      <div className="flex-between">
        <div className="w-full flex flex-row items-center justify-between gap-5">
          <Button variant={"warning"}>
            <FileChartColumn />
            دانلود فایل اکسل
          </Button>
          <BackButton />
        </div>
      </div>
    </div>
  );
}
