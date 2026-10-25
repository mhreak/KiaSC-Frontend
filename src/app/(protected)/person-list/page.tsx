"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { FileChartColumn } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { personListFormConfig } from "./personListFormConfig";
import {
  Person,
  PersonGetListParams,
} from "@/types/api/endpointTypes/person.types";
import ActionItems from "@/components/shared/ActionItems";
import { ColumnDef } from "@tanstack/react-table";
import {
  genderFormatter,
  numberFormatter,
} from "@/components/ui/data-table/formatters";
import { FormMode } from "@/components/formBuilder/types";
import { useTransitionRouter } from "next-view-transitions";
import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { personApi } from "@/api/services/ApiService/personApi";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { personListFilterConfig } from "./personListFilterConfig";

export default function PersonListPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<PersonGetListParams>({});

  const router = useTransitionRouter();

  const {
    data: allPersonsData,
    isLoading: getListLoading,
    execute: getListPersons,
  } = useApi<APIGetTemplate<Person[]>, PersonGetListParams>(personApi.getList);

  useEffect(() => {
    getListPersons();
  }, []);

  const personColumns: ColumnDef<Person>[] = [
    {
      accessorKey: "FullName",
      header: "نام و نام خانوادگی",
    },
    {
      accessorKey: "Mobile",
      header: "تلفن همراه",
      meta: {
        formatter: numberFormatter,
      },
    },
    {
      accessorKey: "Gender",
      header: "جنسیت",
      meta: {
        formatter: genderFormatter,
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
          onView={() => {
            router.push(`/person-list/person-details/${row.original.PersonId}`);
          }}
          onDelete={() => {}}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={personListFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListPersons({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={personColumns}
        data={allPersonsData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allPersonsData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListPersons({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListPersons({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListPersons({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            formConfig={personListFormConfig}
            drawerTitle="فرد"
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
