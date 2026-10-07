"use client";

import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useRef } from "react";
import { dateFormatter } from "@/components/ui/data-table/formatters";
import { Sms } from "@/types/api/endpointTypes/messages.types";
import { smsFormConfig } from "./smsFormConfig";

const sampleData: Sms[] = [
  {
    id: "ethdfh-aejfaek",
    text: "متن پیام",
    date: "2026-10-23",
  },
];

export default function SmsPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const router = useTransitionRouter();

  const smsColumns: ColumnDef<Sms>[] = [
    {
      accessorKey: "text",
      header: "متن پیام",
    },
    {
      accessorKey: "date",
      header: "زمان ارسال",
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
            router.push(`/messages/sms/message-details/${row.original.id}`);
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable columns={smsColumns} data={sampleData} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={smsFormConfig}
            drawerTitle="پیام کوتاه"
            formMode="add"
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
