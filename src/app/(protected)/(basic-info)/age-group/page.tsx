"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  dateFormatter,
  numberFormatter,
} from "@/components/ui/data-table/formatters";
import {
  AgeGroup,
  AgeGroupGetListParams,
} from "@/types/api/endpointTypes/ageGroup.types";
import { Sport } from "@/types/api/endpointTypes/sport.types";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { ageGroupFormConfig } from "./ageGroupFormConfig";
import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { ageGroupApi } from "@/api/services/ApiService/ageGroupApi";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { ageGroupFilterConfig } from "./ageGroupFilterConfig";

export default function AgeGroupPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<AgeGroupGetListParams>({});

  const {
    data: allAgeGroupsData,
    isLoading: getListLoading,
    execute: getListAgeGroups,
  } = useApi<APIGetTemplate<AgeGroup[]>, AgeGroupGetListParams>(
    ageGroupApi.getList,
  );

  useEffect(() => {
    getListAgeGroups();
  }, []);

  const tableColumns: ColumnDef<AgeGroup>[] = [
    {
      accessorKey: "AgeGroupName",
      header: "نام رده سنی",
    },
    {
      accessorKey: "ShamsiAgeGroupStartDate",
      header: "تاریخ آغاز",
      meta: {
        formatter: numberFormatter,
      },
    },
    {
      accessorKey: "ShamsiAgeGroupEndDate",
      header: "تاریخ پایان",
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
            setFormMode("edit");
            formModalRef.current?.open();
          }}
          onDelete={() => {}}
        />
      ),
    },
  ];
  return (
    <div className="space-y-5">
      <FilterRenderer
        config={ageGroupFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListAgeGroups({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={tableColumns}
        data={allAgeGroupsData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allAgeGroupsData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListAgeGroups({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListAgeGroups({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListAgeGroups({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={ageGroupFormConfig}
            drawerTitle="رده سنی"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
          />
        </div>
      </div>
    </div>
  );
}
