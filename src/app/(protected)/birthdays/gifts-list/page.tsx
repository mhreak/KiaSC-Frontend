"use client";

import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useRef, useState } from "react";
import { Gift } from "@/types/api/endpointTypes/birthdays.types";
import { giftsListFormConfig } from "./giftsListFormConfig";
import { useTransitionRouter } from "next-view-transitions";
import { FormMode } from "@/components/formBuilder/types";

const sampleData: Gift[] = [
  {
    id: "ethdfh-aejfaek",
    name: "تولد",
    status: "enabled",
  },
];

export default function GiftsListPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);
  const [formMode, setFormMode] = useState<FormMode>("add");
  const router = useTransitionRouter();

  const giftsListColumns: ColumnDef<Gift>[] = [
    {
      accessorKey: "id",
      header: "شناسۀ هدیه",
    },
    {
      accessorKey: "name",
      header: "نام هدیه",
    },
    {
      accessorKey: "status",
      header: "وضعیت",
      cell: ({ row }) => {
        switch (row.original.status) {
          case "enabled":
            return "فعال";
          case "disabled":
            return "غیرفعال";
        }
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
          otherActions={[
            {
              label: "تغییر وضعیت",
              onClick: () => {},
            },
            {
              label: "ورزشکاران",
              onClick: () => {
                router.push(
                  `/birthdays/gifts-list/gift-athlete-list/${row.original.id}`,
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
      <DataTable columns={giftsListColumns} data={sampleData} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={giftsListFormConfig}
            drawerTitle="هدیه"
            onTriggerButtonClick={() => setFormMode("add")}
            formMode={formMode}
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
