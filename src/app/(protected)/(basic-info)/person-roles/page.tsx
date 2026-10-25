"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import {
  PersonRole,
  PersonRoleGetListParams,
} from "@/types/api/endpointTypes/personRole.types";
import { personRolesFormConfig } from "./personRolesFormConfig";
import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { personRoleApi } from "@/api/services/ApiService/personRoleApi";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { personRolesFilterConfig } from "./personRolesFilterConfig";

export default function PersonRolesPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<PersonRoleGetListParams>({});

  const router = useTransitionRouter();

  const {
    data: allPersonRolesData,
    isLoading: getListLoading,
    execute: getListPersonRoles,
  } = useApi<APIGetTemplate<PersonRole[]>, PersonRoleGetListParams>(
    personRoleApi.getList,
  );

  useEffect(() => {
    getListPersonRoles();
  }, []);

  const tableColumns: ColumnDef<PersonRole>[] = [
    {
      accessorKey: "PersonRoleName",
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
                  `/person-roles/persons-with-role/${row.original.PersonRoleId}?name=${encodeURIComponent(`لیست افراد دارای نقش  ${row.original.PersonRoleName}`)}`,
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
        config={personRolesFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListPersonRoles({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={tableColumns}
        data={allPersonRolesData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allPersonRolesData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListPersonRoles({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListPersonRoles({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListPersonRoles({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={personRolesFormConfig}
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
