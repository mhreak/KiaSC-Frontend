"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { Team } from "@/types/api/endpointTypes/team.types";
import { teamFormConfig } from "./teamFormConfig";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";

const sampleData: Team[] = [
  {
    id: "ritujelkf-dhfgsdskj",
    name: "زیر ۱۳ سال",
    sport: "فوتبال",
    gender: "male",
  },
];

export default function TeamsPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const router = useTransitionRouter();

  const tableColumns: ColumnDef<Team>[] = [
    {
      accessorKey: "name",
      header: "نام تیم",
    },
    {
      accessorKey: "sport",
      header: "رشته ورزشی",
    },
    {
      accessorKey: "gender",
      header: "جنسیت",
      cell({ row }) {
        switch (row.original.gender) {
          case "male":
            return "مرد";
          case "female":
            return "زن";
          default:
            return "مرد";
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
            formModalRef.current?.open();
          }}
          otherActions={[
            {
              onClick: () => {
                router.push(
                  `/teams/athlete-in-team/${row.original.id}?name=${encodeURIComponent(`لیست اعضای تیم ${row.original.name}`)}`,
                );
              },
              label: "مشاهده اعضا",
            },
            {
              onClick: () => {
                router.push(
                  `/teams/person-in-team/${row.original.id}?name=${encodeURIComponent(`لیست افراد تیم ${row.original.name}`)}`,
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
            formConfig={teamFormConfig}
            drawerTitle="تیم"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
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
