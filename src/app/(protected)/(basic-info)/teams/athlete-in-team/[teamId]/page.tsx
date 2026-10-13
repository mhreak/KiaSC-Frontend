"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { useRef, useState } from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import ActionItems from "@/components/shared/ActionItems";
import { FormMode } from "@/components/formBuilder/types";
import BackButton from "@/components/shared/BackButton";
import { AthleteInTeam } from "@/types/api/endpointTypes/athleteInTeam.types";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { athleteInTeamFormConfig } from "./athleteInTeamFormConfig";
import { athleteInTeamFilterConfig } from "./athleteInTeamFilterConfig";

const sampleData: AthleteInTeam[] = [
  {
    id: "ivsjekflisjdjj-aejfaek",
    fullName: "مبین عاطفی",
    role: "بازیکن",
  },
];

export default function AthleteInTeamPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const athleteColumns: ColumnDef<AthleteInTeam>[] = [
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
        config={athleteInTeamFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable columns={athleteColumns} data={sampleData} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={athleteInTeamFormConfig}
            drawerTitle="عضو"
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
