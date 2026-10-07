"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useRef } from "react";
import { currencyFormatter } from "@/components/ui/data-table/formatters";
import { IntroducingWalletCharge } from "@/types/api/endpointTypes/wallet.types";
import { athleteIntroducingChargeFormConfig } from "./athleteIntroducingChargeFormConfig";
import { athleteIntroducingChargeFilterConfig } from "./athleteIntroducingChargeFilterConfig";

const sampleData: IntroducingWalletCharge[] = [
  {
    id: "ethdfh-aejfaek",
    ownerName: "مهدی مهدوی",
    amount: 2000000,
    introducingPercentage: 5,
  },
];

export default function AthleteIntroducingWalletPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const athleteIntroducingWalletColumns: ColumnDef<IntroducingWalletCharge>[] =
    [
      {
        accessorKey: "ownerName",
        header: "نام و نام خانوادگی",
      },
      {
        accessorKey: "amount",
        header: "اعتبار کیف پول",
        meta: {
          formatter: currencyFormatter,
        },
      },

      {
        accessorKey: "introducingPercentage",
        header: "درصد پاداش معرفی",
      },
      {
        id: "actions",
        header: "عملیات",
        cell: ({ row }) => (
          <ActionItems
            row={row}
            onEdit={() => {
              formDrawerRef.current?.open();
            }}
          />
        ),
      },
    ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={athleteIntroducingChargeFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable
        columns={athleteIntroducingWalletColumns}
        data={sampleData}
        mode="filter"
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={athleteIntroducingChargeFormConfig}
            drawerTitle="پاداش معرفی"
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
