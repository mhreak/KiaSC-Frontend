"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";

import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import {
  Guild,
  GuildGetListParams,
} from "@/types/api/endpointTypes/guild.types";
import { guilsFormConfig } from "./guilsFormConfig";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { useApi } from "@/hooks/useApi";
import { guildApi } from "@/api/services/ApiService/guildApi";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { guildsFilterConfig } from "./guildsFilterConfig";

export default function GuildsPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<GuildGetListParams>({});

  const {
    data: allGuildsData,
    isLoading: getListLoading,
    execute: getListGuilds,
  } = useApi<APIGetTemplate<Guild[]>, GuildGetListParams>(guildApi.getList);

  useEffect(() => {
    getListGuilds();
  }, []);

  const tableColumns: ColumnDef<Guild>[] = [
    {
      accessorKey: "SenfName",
      header: "نام صنف",
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
        />
      ),
    },
  ];
  return (
    <div className="space-y-5">
      <FilterRenderer
        config={guildsFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListGuilds({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={tableColumns}
        data={allGuildsData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allGuildsData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListGuilds({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListGuilds({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListGuilds({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={guilsFormConfig}
            drawerTitle="صنف"
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
