"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  dateFormatter,
  numberFormatter,
} from "@/components/ui/data-table/formatters";
import { birthdaysListFilterConfig } from "./birthdaysListFilterConfig";
import { birthdaysListFormConfig } from "./birthdaysListFormConfig";
import {
  Birthday,
  BirthdayGetListParams,
} from "@/types/api/endpointTypes/birthdays.types";
import { FormMode } from "@/components/formBuilder/types";
import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { birthdayGiftApi } from "@/api/services/ApiService/birthdayGiftApi";
import { createPaginationMeta } from "@/utils/utillityFunctions";

export default function BirthdaysListPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<BirthdayGetListParams>({});

  const {
    data: allBirhdaysData,
    isLoading: getListLoading,
    execute: getListBirhdays,
  } = useApi<APIGetTemplate<Birthday[]>, BirthdayGetListParams>(
    birthdayGiftApi.getBirthdays,
  );

  useEffect(() => {
    getListBirhdays();
  }, []);

  const birthdaysListColumns: ColumnDef<Birthday>[] = [
    {
      accessorKey: "AthleteFullName",
      header: "ورزشکار",
    },
    {
      accessorKey: "ShamsiBirthDate",
      header: "تاریخ تولد",
      meta: {
        formatter: numberFormatter,
      },
    },
    {
      accessorKey: "BirthDayGiftName",
      header: "هدیه تولد",
    },
    {
      accessorKey: "Mobile",
      header: "تلفن همراه",
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
            formDrawerRef.current?.open();
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={birthdaysListFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListBirhdays({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={birthdaysListColumns}
        data={allBirhdaysData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allBirhdaysData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListBirhdays({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListBirhdays({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          getListBirhdays({
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
            formConfig={birthdaysListFormConfig}
            drawerTitle="هدیه تولد ورزشکار"
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
