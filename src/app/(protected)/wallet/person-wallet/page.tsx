"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
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
import { Wallet } from "@/types/api/endpointTypes/wallet.types";
import { personWalletFilterConfig } from "./personWalletFilterConfig";
import { editPersonWalletFormConfig } from "./personWalletFormConfig";

const sampleData: Wallet[] = [
  {
    id: "ethdfh-aejfaek",
    ownerName: "مهدی مهدوی",
    amount: 2000000,
    modifiedDate: "2026-10-23",
  },
];

export default function AthleteWalletPage() {
  const editFormDrawerRef = useRef<FormDrawerRef>(null);

  const router = useTransitionRouter();

  const personWalletColumns: ColumnDef<Wallet>[] = [
    {
      accessorKey: "ownerName",
      header: "صاحب کیف پول",
    },
    {
      accessorKey: "amount",
      header: "موجودی",
      meta: {
        formatter: currencyFormatter,
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
                router.push(
                  `/wallet/person-wallet/wallet-history/${row.original.id}?name=${"سابقه تغییرات کیف پول " + row.original.ownerName}`,
                );
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={personWalletFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable columns={personWalletColumns} data={sampleData} mode="filter" />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={editFormDrawerRef}
            formConfig={editPersonWalletFormConfig}
            drawerTitle="کیف پول"
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
