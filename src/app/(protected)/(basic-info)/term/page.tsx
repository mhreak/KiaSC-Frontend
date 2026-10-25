"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import {
  Term,
  TermGet,
  TermGetListParams,
} from "@/types/api/endpointTypes/term.types";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import { termFormConfig } from "./termFormConfig";
import { useApi } from "@/hooks/useApi";
import { termApi } from "@/api/services/ApiService/termApi";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import {
  createPaginationMeta,
  generateFormConfig,
} from "@/utils/utillityFunctions";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { termFilterConfig } from "./termFilterConfig";
import { toast } from "@/lib/toast/toast";

export default function TermsPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<TermGetListParams>({});

  const {
    data: allTermsData,
    isLoading: getListLoading,
    execute: getListTerms,
  } = useApi<APIGetTemplate<Term[]>, TermGetListParams>(termApi.getList);

  const {
    data: termData,
    isLoading: getLoading,
    execute: getTerm,
  } = useApi<TermGet, { id: number }>(termApi.get);

  const { isLoading: addLoading, execute: addTerm } = useApi<
    APIAddTemplateResponse<number>,
    any
  >(termApi.add, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formDrawerRef.current?.close();
      getListTerms({
        ...filterItems,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { isLoading: editLoading, execute: editTerm } = useApi<
    APIAddTemplateResponse,
    any
  >(termApi.edit, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formDrawerRef.current?.close();
      getListTerms({
        ...filterItems,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const isSubmitting = addLoading || editLoading;

  useEffect(() => {
    getListTerms();
  }, []);

  const formConfig = generateFormConfig(termFormConfig, {
    values: formMode === "edit" ? termData || undefined : undefined,
  });

  const tableColumns: ColumnDef<Term>[] = [
    {
      accessorKey: "TermName",
      header: "نام ترم",
    },
    {
      accessorKey: "Year",
      header: "سال",
      meta: {
        formatter: numberFormatter,
      },
    },
    {
      accessorKey: "SeasonName",
      header: "فصل",
    },

    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onEdit={() => {
            setFormMode("edit");
            getTerm({ id: row.original.TermId });
            formDrawerRef.current?.open();
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={termFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListTerms({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={tableColumns}
        data={allTermsData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allTermsData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListTerms({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListTerms({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListTerms({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={formConfig}
            onSubmit={(data) => {
              if (formMode === "add") addTerm(data);
              else if (formMode === "edit")
                editTerm({ TermId: termData?.TermId, ...data });
            }}
            drawerTitle="ترم"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
            isSubmitting={isSubmitting}
            isLoading={getLoading}
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
