"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { AthleteRole } from "@/types/api/endpointTypes/athleteRole.types";
import { athleteRolesFormConfig } from "./athleteRolesFormConfig";

const sampleData: AthleteRole[] = [
  {
    id: "ritujelkf-dhfgsdskj",
    roleName: "بازیکن",
    sport: "فوتبال",
  },
];

export default function AthleteRolesPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const router = useTransitionRouter();

  const tableColumns: ColumnDef<AthleteRole>[] = [
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
                  `/athlete-roles/athletes-with-role/${row.original.id}?name=${encodeURIComponent(`لیست افراد دارای نقش  ${row.original.roleName}`)}`,
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
            formConfig={athleteRolesFormConfig}
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
