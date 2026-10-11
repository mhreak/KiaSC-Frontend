"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  currencyFormatter,
  numberFormatter,
} from "@/components/ui/data-table/formatters";
import { ShopProduct } from "@/types/api/endpointTypes/shopProduct";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useRef, useState } from "react";
import { shopProductFormConfig } from "../shopProductFormConfig";
import { useParams } from "next/navigation";
import BackButton from "@/components/shared/BackButton";

const sampleData: ShopProduct[] = [
  {
    id: "asedf-dguerj",
    name: "کفش سالنی",
    shopName: "اسپرت کیا",
    price: 1000000,
    discountPercent: 20,
    status: true,
    statusStr: "فعال",
  },
];

export default function ShopProductPage() {
  const { shopId } = useParams<{ shopId: string }>();

  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");

  const shopProductColumns: ColumnDef<ShopProduct>[] = [
    {
      accessorKey: "name",
      header: "نام محصول",
    },
    {
      accessorKey: "shopName",
      header: "فروشگاه",
    },
    {
      accessorKey: "price",
      header: "قیمت",
      meta: {
        formatter: currencyFormatter,
      },
    },
    {
      accessorKey: "discountPercent",
      header: "درصد تخفیف محصول",
      meta: {
        formatter: numberFormatter,
      },
    },
    {
      accessorKey: "statusStr",
      header: "وضعیت",
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
      <DataTable columns={shopProductColumns} data={sampleData} />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={shopProductFormConfig}
            drawerTitle="محصول"
            formMode={formMode}
          />
          <Button variant={"warning"}>
            <FileChartColumn />
            دانلود فایل اکسل
          </Button>
        </div>
        <BackButton />
      </div>
    </div>
  );
}
