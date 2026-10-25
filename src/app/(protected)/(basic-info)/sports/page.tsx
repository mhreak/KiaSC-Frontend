"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  Sport,
  SportGet,
  SportGetListParams,
} from "@/types/api/endpointTypes/sport.types";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { sportFormConfig } from "./sportFormConfig";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import { useApi } from "@/hooks/useApi";
import { sportApi } from "@/api/services/ApiService/sportApi";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import {
  createPaginationMeta,
  generateFormConfig,
} from "@/utils/utillityFunctions";
import { sportFilterConfig } from "./sportFilterConfig";
import { toast } from "@/lib/toast/toast";

export default function SportPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<SportGetListParams>({});

  const {
    data: allSportsData,
    isLoading: getListLoading,
    execute: getAllSports,
  } = useApi<APIGetTemplate<Sport[]>, SportGetListParams>(sportApi.getList);

  const {
    data: sportData,
    isLoading: getLoading,
    execute: getsport,
  } = useApi<SportGet, { id: number }>(sportApi.get);

  const { isLoading: addLoading, execute: addSport } = useApi<
    APIAddTemplateResponse<number>,
    any
  >(sportApi.add, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formModalRef.current?.close();
      getAllSports({
        ...filterItems,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { isLoading: editLoading, execute: editSport } = useApi<
    APIAddTemplateResponse,
    any
  >(sportApi.edit, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formModalRef.current?.close();
      getAllSports({
        ...filterItems,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const isSubmitting = addLoading || editLoading;

  useEffect(() => {
    getAllSports();
  }, []);

  const FormConfig = generateFormConfig(sportFormConfig, {
    values: formMode === "edit" ? sportData || undefined : undefined,
  });

  const athleteColumns: ColumnDef<Sport>[] = [
    {
      accessorKey: "SportName",
      header: "نام رشته ورزشی",
    },

    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onEdit={() => {
            setFormMode("edit");
            getsport({ id: row.original.SportId });
            formModalRef.current?.open();
          }}
        />
      ),
    },
  ];
  return (
    <div className="space-y-5">
      <FilterRenderer
        config={sportFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getAllSports({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={athleteColumns}
        data={allSportsData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allSportsData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getAllSports({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getAllSports({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getAllSports({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={FormConfig}
            drawerTitle="رشته ورزشی"
            formMode={formMode}
            onSubmit={(data) => {
              if (formMode === "add") addSport(data);
              else if (formMode === "edit")
                editSport({ ...data, SportId: sportData?.SportId });
            }}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
            isSubmitting={isSubmitting}
            isLoading={getLoading}
            modalContentClassName="md:w-[35vw] md:max-w-2xl"
          />
        </div>
      </div>
    </div>
  );
}
