"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { PersonRole } from "@/types/api/endpointTypes/personRole.types";
import { personRolesFormConfig } from "./personRolesFormConfig";

const sampleData: PersonRole[] = [
  {
    id: "ritujelkf-dhfgsdskj",
    roleName: "مربی",
    sport: "فوتبال",
  },
];

export default function PersonRolesPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const router = useTransitionRouter();

  const tableColumns: ColumnDef<PersonRole>[] = [
    {
      accessorKey: "roleName",
      header: "نام نقش",
    },
    {
      accessorKey: "sport",
      header: "رشته ورزشی",
    },

    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onEdit={() => {
            setFormMode("edit");
            formModalRef.current?.open();
          }}
          otherActions={[
            {
              onClick: () => {
                router.push(
                  `/person-roles/persons-with-role/${row.original.id}?name=${encodeURIComponent(`لیست افراد دارای نقش  ${row.original.roleName}`)}`,
                );
              },
              label: "مشاهده افراد",
            },
          ]}
        />
      ),
    },
  ];
  return (
    <div className="space-y-5">
      <DataTable columns={tableColumns} data={sampleData} />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={personRolesFormConfig}
            drawerTitle="نقش"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
          />
        </div>
      </div>
    </div>
  );
}
