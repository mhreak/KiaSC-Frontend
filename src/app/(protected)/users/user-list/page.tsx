"use client";

import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useRef } from "react";
import {
  addUserListFormConfig,
  editUserListFormConfig,
} from "./userListFormConfig";
import { User } from "@/types/api/endpointTypes/users.types";

const sampleData: User[] = [
  {
    id: "ethdfh-aejfaek",
    name: "مهدی مهدوی",
    role: "Manager",
  },
];

export default function UserListPage() {
  const addFormDrawerRef = useRef<FormDrawerRef>(null);
  const editFormDrawerRef = useRef<FormDrawerRef>(null);

  const router = useTransitionRouter();

  const UsersColumns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "شناسۀ کاربر",
    },
    {
      accessorKey: "name",
      header: "نام",
    },

    {
      accessorKey: "role",
      header: "نقش",
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
              label: "مشاهدۀ فعالیت",
              onClick: () => {
                router.push(
                  `/users/user-list/user-activity/${row.original.id}`,
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
      <DataTable columns={UsersColumns} data={sampleData} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={addFormDrawerRef}
            formConfig={addUserListFormConfig}
            drawerTitle="کاربر جدید"
            formMode="add"
          />
          <FormDrawer
            ref={editFormDrawerRef}
            formConfig={editUserListFormConfig}
            drawerTitle="اطلاعات کاربر"
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
