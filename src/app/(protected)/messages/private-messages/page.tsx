"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useRef, useState } from "react";
import { dateFormatter } from "@/components/ui/data-table/formatters";
import { PrivateMessage } from "@/types/api/endpointTypes/messages.types";
import { privateMessagesFilterConfig } from "./privateMessagesFilterConfig";
import { FormMode } from "@/components/formBuilder/types";
import { privateMessagesFormConfig } from "./privateMessagesFormConfig";

const sampleData: PrivateMessage[] = [
  {
    id: "ethdfh-aejfaek",
    sender: "مهدی مهدوی",
    receiver: "علی علوی",
    title: "عنوان پیام",
    status: "published",
    date: "2026-10-23",
  },
];

export default function PrivateMessagesPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);
  const [formMode, setFormMode] = useState<FormMode>("add");
  const router = useTransitionRouter();

  const privateMessagesColumns: ColumnDef<PrivateMessage>[] = [
    {
      accessorKey: "sender",
      header: "ارسال‌کننده",
    },
    {
      accessorKey: "receiver",
      header: "گیرنده",
    },
    {
      accessorKey: "title",
      header: "عنوان پیام",
    },
    {
      accessorKey: "status",
      header: "وضعیت انتشار",
      cell: ({ row }) => {
        switch (row.original.status) {
          case "published":
            return "منتشر شده";
          case "unpublished":
            return "منتشر نشده";
        }
      },
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
          onEdit={() => {
            formDrawerRef.current?.open();
          }}
          onView={() => {
            router.push(
              `/messages/private-messages/message-details/${row.original.id}`,
            );
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={privateMessagesFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable
        columns={privateMessagesColumns}
        data={sampleData}
        mode="filter"
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={privateMessagesFormConfig}
            drawerTitle="پیام"
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
