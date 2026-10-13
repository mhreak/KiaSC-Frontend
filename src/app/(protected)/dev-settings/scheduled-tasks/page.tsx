"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { dateFormatter } from "@/components/ui/data-table/formatters";
import { Task } from "@/types/api/endpointTypes/tasks.types";

const sampleData: Task[] = [
  {
    id: "ethdfh-aejfaek",
    name: "ارسال پیامک تولد",
    status: "enabled",
    lastRuntime: "2026-10-23",
    lastRuntimeStatus: "success",
  },
];

export default function ScheduledTasksPage() {
  const tasksColumns: ColumnDef<Task>[] = [
    {
      accessorKey: "name",
      header: "نام",
    },
    {
      accessorKey: "status",
      header: "وضعیت",
      cell: ({ row }) => {
        switch (row.original.status) {
          case "enabled":
            return "فعال";
          case "disabled":
            return "غیر فعال";
        }
      },
    },

    {
      accessorKey: "lastRuntime",
      header: "زمان آخرین اجرا",
      meta: {
        formatter: dateFormatter,
      },
    },
    {
      accessorKey: "lastRuntimeStatus",
      header: "وضعیت آخرین اجرا",
      cell: ({ row }) => {
        switch (row.original.lastRuntimeStatus) {
          case "success":
            return "موفق";
          case "failed":
            return "نا موفق";
        }
      },
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable columns={tasksColumns} data={sampleData} mode="filter" />
    </div>
  );
}
