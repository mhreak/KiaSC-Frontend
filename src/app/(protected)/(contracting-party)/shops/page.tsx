"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import { Shop } from "@/types/api/endpointTypes/shop.types";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import React, { useRef, useState } from "react";
import { shopFormConfig } from "./shopFormConfig";

const sampleData: Shop[] = [
  {
    id: "asedf-dguerj",
    name: "اسپرت کیا",
    category: "پوشاک و لوازم ورزشی",
    productsCount: 2,
  },
];

export default function ShopsPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const router = useTransitionRouter();

  const shopColumns: ColumnDef<Shop>[] = [
    {
      accessorKey: "name",
      header: "نام فروشگاه",
    },
    {
      accessorKey: "category",
      header: "صنف",
    },
    {
      accessorKey: "productsCount",
      header: "تعداد محصولات",
      meta: {
        formatter: numberFormatter,
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
              onClick: () => {
                router.push(
                  `/shop-products/${row.original.id}?name=${encodeURIComponent(`لیست محصولات فروشگاه ${row.original.name}`)}`,
                );
              },
              label: "مشاهده محصولات",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable columns={shopColumns} data={sampleData} />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={shopFormConfig}
            drawerTitle="فروشگاه"
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
