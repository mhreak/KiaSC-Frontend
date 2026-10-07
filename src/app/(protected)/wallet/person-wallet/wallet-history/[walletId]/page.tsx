"use client";

import BackButton from "@/components/shared/BackButton";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  currencyFormatter,
  dateFormatter,
} from "@/components/ui/data-table/formatters";
import { Tabs } from "@/components/ui/tabs";
import { WalletHistory } from "@/types/api/endpointTypes/wallet.types";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useParams } from "next/navigation";

const sampleData: WalletHistory[] = [
  {
    id: "ethdfh-aejfaek",
    date: "2026-10-23",
    amountChange: 1200000,
    amountAfterChange: 2000000,
    description: "هدیه تولد",
  },
];

export default function TransactionDetailsPage() {
  const { walletId } = useParams<{ walletId: string }>();

  const walletHistoryColumns: ColumnDef<WalletHistory>[] = [
    {
      accessorKey: "date",
      header: "تاریخ",
      meta: {
        formatter: dateFormatter,
      },
    },
    {
      accessorKey: "amountChange",
      header: "میزان تغییر",
      meta: {
        formatter: currencyFormatter,
      },
    },
    {
      accessorKey: "amountAfterChange",
      header: "موجودی پس از تغییر",
      meta: {
        formatter: currencyFormatter,
      },
    },
    {
      accessorKey: "description",
      header: "شرح",
    },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex-1">
        <Tabs className={"mb-auto h-full"}>
          <DataTable
            columns={walletHistoryColumns}
            data={sampleData}
            mode="filter"
          />
        </Tabs>
      </div>
      <div className="h-max flex justify-between items-center">
        <Button variant={"warning"}>
          <FileChartColumn />
          دانلود فایل اکسل
        </Button>
        <BackButton />
      </div>
    </div>
  );
}
