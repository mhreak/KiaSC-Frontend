"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { installmentFilterConfig } from "./installmentFilterConfig";
import {
  Installment,
  InstallmentGetListParams,
} from "@/types/api/endpointTypes/installment.types";
import {
  currencyFormatter,
  dateFormatter,
} from "@/components/ui/data-table/formatters";
import { installmentFormConfig } from "./installmentFormConfig";
import { FormMode } from "@/components/formBuilder/types";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { useApi } from "@/hooks/useApi";
import { installmentApi } from "@/api/services/ApiService/installmentApi";
import {
  createPaginationMeta,
  generateFormConfig,
} from "@/utils/utillityFunctions";

export default function InstallmentPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<InstallmentGetListParams>({});

  const router = useTransitionRouter();

  const {
    data: allInstallmentsData,
    isLoading: getListLoading,
    execute: getListInstallments,
  } = useApi<APIGetTemplate<Installment[]>, InstallmentGetListParams>(
    installmentApi.getList,
  );

  useEffect(() => {
    getListInstallments();
  }, []);

  const formConfig = generateFormConfig(installmentFormConfig, {});

  const installmentColumns: ColumnDef<Installment>[] = [
    {
      accessorKey: "athlete",
      header: "ورزشکار",
    },
    {
      accessorKey: "course",
      header: "دورۀ آموزشی",
    },

    {
      accessorKey: "installmentAmount",
      header: "مبلغ قسط",
      meta: {
        formatter: currencyFormatter,
      },
    },
    {
      accessorKey: "dueDate",
      header: "تاریخ سررسید",
      meta: {
        formatter: dateFormatter,
      },
    },
    {
      accessorKey: "status",
      header: "وضعیت",
      cell: ({ row }) => {
        switch (row.original.status) {
          case "settled":
            return "تسویه شده";
          case "unsettled":
            return "تسویه نشده";
          case "deleted":
            return "حذف شده";
        }
      },
    },
    {
      accessorKey: "settlementDate",
      header: "تاریخ تسویه",
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
            setFormMode("edit");
            formDrawerRef.current?.open();
          }}
          otherActions={[
            {
              label: "آیتم‌های قسط",
              onClick: () => {
                router.push(
                  `/installment/installment-items/${row.original.id}`,
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
        config={installmentFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListInstallments({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={installmentColumns}
        data={allInstallmentsData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allInstallmentsData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListInstallments({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListInstallments({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          getListInstallments({
            ...filterItems,
            PageNumber: page,
            PageSize: pageSize,
          });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={formConfig}
            drawerTitle="اقساط"
            formMode={formMode}
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
