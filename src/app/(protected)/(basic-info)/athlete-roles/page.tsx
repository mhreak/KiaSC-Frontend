"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import {
  AthleteRole,
  AthleteRoleGetListParams,
} from "@/types/api/endpointTypes/athleteRole.types";
import { athleteRolesFormConfig } from "./athleteRolesFormConfig";
import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { athleteRoleApi } from "@/api/services/ApiService/athleteRoleApi";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { athleteRolesFilterConfig } from "./athleteRolesFilterConfig";

export default function AthleteRolesPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<AthleteRoleGetListParams>({});

  const router = useTransitionRouter();

  const {
    data: allAthleteRolesData,
    isLoading: getListLoading,
    execute: getListAthleteRoles,
  } = useApi<APIGetTemplate<AthleteRole[]>, AthleteRoleGetListParams>(
    athleteRoleApi.getList,
  );

  useEffect(() => {
    getListAthleteRoles();
  }, []);

  const tableColumns: ColumnDef<AthleteRole>[] = [
    {
      accessorKey: "AthleteRoleName",
      header: "نام نقش",
    },
    {
      accessorKey: "SportName",
      header: "رشته ورزشی",
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
          otherActions={[
            {
              onClick: () => {
                router.push(
                  `/athlete-roles/athletes-with-role/${row.original.AthleteRoleId}?name=${encodeURIComponent(`لیست افراد دارای نقش  ${row.original.AthleteRoleName}`)}`,
                );
              },
              label: "مشاهده افراد",
            },
          ]}
        />
      ),
    },
  ];
  return (
    <div className="space-y-5">
      <FilterRenderer
        config={athleteRolesFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListAthleteRoles({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={tableColumns}
        data={allAthleteRolesData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allAthleteRolesData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListAthleteRoles({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListAthleteRoles({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListAthleteRoles({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={athleteRolesFormConfig}
            drawerTitle="نقش"
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
