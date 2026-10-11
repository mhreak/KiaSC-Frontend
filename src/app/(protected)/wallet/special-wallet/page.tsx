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
  currencyFormatter,
  dateFormatter,
} from "@/components/ui/data-table/formatters";
import {
  addSpecialWalletFormConfig,
  editSpecialWalletFormConfig,
} from "./specialWalletFormConfig";
import { SpecialWallet } from "@/types/api/endpointTypes/wallet.types";

const sampleData: SpecialWallet[] = [
  {
    id: "ethdfh-aejfaek",
    name: "مدیر عامل",
    amount: 2000000,
    status: "enabled",
    modifiedDate: "2026-10-23",
  },
];

export default function SpecialWalletPage() {
  const addFormDrawerRef = useRef<FormDrawerRef>(null);
  const editFormDrawerRef = useRef<FormDrawerRef>(null);

  const router = useTransitionRouter();

  const specialWalletColumns: ColumnDef<SpecialWallet>[] = [
    {
      accessorKey: "name",
      header: "نام کیف پول",
    },
    {
      accessorKey: "amount",
      header: "موجودی کیف پول",
      meta: {
        formatter: currencyFormatter,
      },
    },

    {
      accessorKey: "status",
      header: "وضعیت",
      cell: ({ row }) => {
        switch (row.original.status) {
          case "enabled":
            return "فعال";
          case "disabled":
            return "غیر فعال";
        }
      },
    },
    {
      accessorKey: "modifiedDate",
      header: "آخرین تغییر",
      meta: {
        formatter: dateFormatter,
      },
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
              label: "سابقه تغییرات",
              onClick: () => {
                router.push(`/wallet/special-wallet/wallet-history/${row.original.id}?name=${"سابقه تغییرات کیف پول " + row.original.name}`);
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable
        columns={specialWalletColumns}
        data={sampleData}
        mode="filter"
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={addFormDrawerRef}
            formConfig={addSpecialWalletFormConfig}
            drawerTitle="کیف پول جدید"
            formMode="add"
          />
          <FormDrawer
            ref={editFormDrawerRef}
            formConfig={editSpecialWalletFormConfig}
            drawerTitle="کیف پول ویژه"
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
