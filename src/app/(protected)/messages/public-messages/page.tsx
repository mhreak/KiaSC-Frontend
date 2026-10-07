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
import { dateFormatter } from "@/components/ui/data-table/formatters";
import { publicMessagesFilterConfig } from "./publicMessagesFilterConfig";
import {
  addPublicMessagesFormConfig,
  editPublicMessagesFormConfig,
} from "./publicMessagesFormConfig";
import { Message } from "@/types/api/endpointTypes/messages.types";

const sampleData: Message[] = [
  {
    id: "ethdfh-aejfaek",
    title: "عنوان پیام",
    status: "published",
    date: "2026-10-23",
  },
];

export default function PublicMessagesPage() {
  const addFormDrawerRef = useRef<FormDrawerRef>(null);
  const editFormDrawerRef = useRef<FormDrawerRef>(null);

  const router = useTransitionRouter();

  const publicMessagesColumns: ColumnDef<Message>[] = [
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
            editFormDrawerRef.current?.open();
          }}
          onView={() => {
            router.push(`/messages/public-messages/message-details/${row.original.id}`);
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={publicMessagesFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable
        columns={publicMessagesColumns}
        data={sampleData}
        mode="filter"
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={addFormDrawerRef}
            formConfig={addPublicMessagesFormConfig}
            drawerTitle="پیام"
            formMode="add"
          />
          <FormDrawer
            ref={editFormDrawerRef}
            formConfig={editPublicMessagesFormConfig}
            drawerTitle="پیام"
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
