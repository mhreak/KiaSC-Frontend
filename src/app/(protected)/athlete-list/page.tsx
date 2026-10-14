"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import React, { useEffect, useRef, useState } from "react";
import { athleteListFilterConfig } from "./athleteListFilterConfig";
import { DataTable } from "@/components/ui/data-table/data-table";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";
import { athleteListFormConfig } from "./athleteListFormConfig";
import {
  Athlete,
  AthleteGet,
  AthleteGetListParams,
} from "@/types/api/endpointTypes/athlete.types";
import { ColumnDef } from "@tanstack/react-table";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import ActionItems from "@/components/shared/ActionItems";
import { FormMode } from "@/components/formBuilder/types";
import { useTransitionRouter } from "next-view-transitions";
import { useApi } from "@/hooks/useApi";
import { athleteApi } from "@/api/services/ApiService/athleteApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import {
  createPaginationMeta,
  generateFormConfig,
} from "@/utils/utillityFunctions";

export default function AthleteListPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<AthleteGetListParams>({});

  const router = useTransitionRouter();

  const {
    data: allAthletesData,
    isLoading: getListLoading,
    execute: getListAthletes,
  } = useApi<APIGetTemplate<Athlete[]>, AthleteGetListParams>(
    athleteApi.getList,
  );
  const {
    data: athleteData,
    isLoading: getLoading,
    execute: getAthlete,
  } = useApi<AthleteGet, { id: number }>(athleteApi.get);

  useEffect(() => {
    getListAthletes();
  }, []);

  const formConfig = generateFormConfig(athleteListFormConfig, {
    values: athleteData ?? undefined,
  });

  const athleteColumns: ColumnDef<Athlete>[] = [
    {
      accessorKey: "FullName",
      header: "نام و نام خانوادگی",
    },
    {
      accessorKey: "FatherName",
      header: "نام پدر",
    },
    {
      accessorKey: "NationalCode",
      header: "کد ملی",
      meta: {
        formatter: numberFormatter,
      },
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
      cell({ row }) {
        if (row.original.Gender) {
          return "مرد";
        } else {
          return "زن";
        }
      },
    },
    {
      accessorKey: "AgeGroupName",
      header: "گروه سنی",
    },
    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onEdit={() => {
            setFormMode("edit");
            // getAthlete({ id: row.original.AthleteId });
            formDrawerRef.current?.open();
          }}
          onView={() => {
            router.push(
              `/athlete-list/athlete-details/${row.original.AthleteId}`,
            );
          }}
          onDelete={() => {}}
        />
      ),
    },
  ];
  return (
    <div className="space-y-5">
      <FilterRenderer
        config={athleteListFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListAthletes({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={athleteColumns}
        data={allAthletesData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allAthletesData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListAthletes({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListAthletes({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListAthletes({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={formConfig}
            drawerTitle="ورزشکار"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
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
