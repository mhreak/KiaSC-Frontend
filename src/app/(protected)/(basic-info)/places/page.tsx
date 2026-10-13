"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useRef, useState } from "react";

import { Place } from "@/types/api/endpointTypes/place.types";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { placeFormConfig } from "./placeFormConfig";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";

const sampleData: Place[] = [
  {
    id: "guoir-dhfgsdskj",
    name: "ورزشگاه رسالت",
    manager: "آموزش و پرورش",
    rabetName: "",
  },
];

export default function PlacesPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const router = useTransitionRouter();

  const tableColumns: ColumnDef<Place>[] = [
    {
      accessorKey: "name",
      header: "نام ورزشگاه",
    },
    {
      accessorKey: "manager",
      header: "مدیریت",
    },
    {
      accessorKey: "rabetName",
      header: "نام و نام خانوادگی رابط",
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
              onClick: () => {
                router.push(
                  `/places/sub-places/${row.original.id}?name=لیست زمین ها و سالن های ${row.original.name}`,
                );
              },
              label: "لیست زمین ها",
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
          <FormDrawer
            ref={formDrawerRef}
            formConfig={placeFormConfig}
            drawerTitle="ورزشگاه"
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
