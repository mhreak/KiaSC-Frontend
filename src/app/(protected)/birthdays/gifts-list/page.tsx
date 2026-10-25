"use client";

import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Gift,
  GiftGetListParams,
} from "@/types/api/endpointTypes/birthdays.types";
import { giftsListFormConfig } from "./giftsListFormConfig";
import { useTransitionRouter } from "next-view-transitions";
import { FormMode } from "@/components/formBuilder/types";
import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { birthdayGiftApi } from "@/api/services/ApiService/birthdayGiftApi";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { giftListFilterConfig } from "./giftListFilterConfig";
import {
  currencyFormatter,
  numberFormatter,
  statusFormatter,
} from "@/components/ui/data-table/formatters";

export default function GiftsListPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<GiftGetListParams>({});

  const router = useTransitionRouter();

  const {
    data: allGiftsData,
    isLoading: getListLoading,
    execute: getListGifts,
  } = useApi<APIGetTemplate<Gift[]>, GiftGetListParams>(
    birthdayGiftApi.getList,
  );

  useEffect(() => {
    getListGifts();
  }, []);

  const giftsListColumns: ColumnDef<Gift>[] = [
    {
      accessorKey: "GiftId",
      header: "شناسۀ هدیه",
    },
    {
      accessorKey: "GiftName",
      header: "نام هدیه",
    },
    {
      accessorKey: "Amount",
      header: "مبلغ شارژ کیف پول",
      meta: {
        formatter: currencyFormatter,
      },
    },
    {
      accessorKey: "Active",
      header: "وضعیت",
      meta: {
        formatter: statusFormatter,
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
              label: "تغییر وضعیت",
              onClick: () => {},
            },
            {
              label: "ورزشکاران",
              onClick: () => {
                router.push(
                  `/birthdays/gifts-list/gift-athlete-list/${row.original.GiftId}`,
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
        config={giftListFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListGifts({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={giftsListColumns}
        data={allGiftsData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allGiftsData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListGifts({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListGifts({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListGifts({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={giftsListFormConfig}
            drawerTitle="هدیه"
            onTriggerButtonClick={() => setFormMode("add")}
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
