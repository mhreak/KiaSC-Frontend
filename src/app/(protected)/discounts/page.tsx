"use client";

import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import {
  Discount,
  DiscountGetListParams,
} from "@/types/api/endpointTypes/discounts.types";
import { discountFormConfig } from "./discountsFormConfig";
import { FormMode } from "@/components/formBuilder/types";
import { useApi } from "./../../../hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { discountCodeApi } from "@/api/services/ApiService/discountCode";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { discountFilterConfig } from "./discountFilterConfig";

export default function DiscountsPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<DiscountGetListParams>({});

  const router = useTransitionRouter();

  const {
    data: allDiscountData,
    isLoading: getListLoading,
    execute: getListDiscount,
  } = useApi<APIGetTemplate<Discount[]>, DiscountGetListParams>(
    discountCodeApi.getList,
  );

  useEffect(() => {
    getListDiscount();
  }, []);

  const discountsColumns: ColumnDef<Discount>[] = [
    {
      accessorKey: "name",
      header: "نام کد",
    },
    {
      accessorKey: "code",
      header: "کد تخفیف",
    },
    {
      accessorKey: "type",
      header: "نوع",
      cell: ({ row }) => {
        switch (row.original.type) {
          case "byPrice":
            return "تخفیف مبلغ ثابت";
          case "byPercentage":
            return "تخفیف درصدی";
          case "custom":
            return "روش دلخواه";
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
            formDrawerRef.current?.open();
          }}
          otherActions={[
            {
              label: "گزارش استفاده",
              onClick: () => {
                router.push(`/discounts/discount-report/${row.original.id}`);
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
        config={discountFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListDiscount({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={discountsColumns}
        data={allDiscountData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allDiscountData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListDiscount({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListDiscount({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListDiscount({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={discountFormConfig}
            drawerTitle="کد تخفیف"
            formMode={formMode}
            onTriggerButtonClick={() => setFormMode("add")}
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
