"use client";

import ActionItems from "@/components/shared/ActionItems";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { dateFormatter } from "@/components/ui/data-table/formatters";
import { Review } from "@/types/api/endpointTypes/reviews.types";

const sampleData: Review[] = [
  {
    id: "ethdfh-aejfaek",
    sender: "مهدی مهدوی",
    subject: "پیشنهاد",
    createdAt: "2026-10-23",
  },
];

export default function ReviewListPage() {
  const router = useTransitionRouter();

  const reviewsColumns: ColumnDef<Review>[] = [
    {
      accessorKey: "sender",
      header: "ارسال کننده",
    },
    {
      accessorKey: "subject",
      header: "موضوع",
    },

    {
      accessorKey: "createdAt",
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
          onView={() =>
            router.push(`/review-list/review-details/${row.original.id}`)
          }
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable columns={reviewsColumns} data={sampleData} mode="filter" />
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
