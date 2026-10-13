"use client";

import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { userRoleFormConfig } from "./userListFormConfig";
import { UserRole } from "@/types/api/endpointTypes/users.types";
import { FormMode } from "@/components/formBuilder/types";

const sampleData: UserRole[] = [
  {
    id: "ethdfh-aejfaek",
    name: "Admin",
  },
];

export default function UserRolePage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);
  const [formMode, setFormMode] = useState<FormMode>("add");

  const rolesColumns: ColumnDef<UserRole>[] = [
    {
      accessorKey: "name",
      header: "نقش کاربری",
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
          onDelete={() => {}}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable columns={rolesColumns} data={sampleData} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={userRoleFormConfig}
            drawerTitle="نقش"
            onTriggerButtonClick={() => setFormMode("add")}
            formMode={formMode}
          />
        </div>
      </div>
    </div>
  );
}
