"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { useRef, useState } from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import ActionItems from "@/components/shared/ActionItems";
import { FormMode } from "@/components/formBuilder/types";
import BackButton from "@/components/shared/BackButton";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { PersonInTeam } from "@/types/api/endpointTypes/personInTeam";
import { personInTeamFilterConfig } from "./personInTeamFilterConfig";
import { personInTeamFormConfig } from "./personInTeamFormConfig";

const sampleData: PersonInTeam[] = [
  {
    id: "ivsjekflisjdjj-aejfaek",
    fullName: "سعید زمانی علویجه",
    role: "مربی",
  },
];

export default function PersonInTeamPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const athleteColumns: ColumnDef<PersonInTeam>[] = [
    {
      accessorKey: "fullName",
      header: "نام و نام خانوادگی",
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
            setFormMode("edit");
            formModalRef.current?.open();
          }}
          onDelete={() => {}}
        />
      ),
    },
  ];
  return (
    <div className="space-y-5">
      <FilterRenderer
        config={personInTeamFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable columns={athleteColumns} data={sampleData} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={personInTeamFormConfig}
            drawerTitle="فرد"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
          />
        </div>
        <BackButton />
      </div>
    </div>
  );
}
