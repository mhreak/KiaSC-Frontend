"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  SubPlace,
  SubPlaceGetListParams,
} from "@/types/api/endpointTypes/subPlace.types";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { subPlaceFormConfig } from "./subPlaceFormConfig";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";
import BackButton from "@/components/shared/BackButton";
import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { subPlaceApi } from "@/api/services/ApiService/subPlaceApi";
import { createPaginationMeta } from "@/utils/utillityFunctions";

export default function SubPlacePage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<SubPlaceGetListParams>({});

  const {
    data: allSubPlacesData,
    isLoading: getListLoading,
    execute: getListSubPlaces,
  } = useApi<APIGetTemplate<SubPlace[]>, SubPlaceGetListParams>(
    subPlaceApi.getList,
  );

  useEffect(() => {
    getListSubPlaces();
  }, []);

  const tableColumns: ColumnDef<SubPlace>[] = [
    {
      accessorKey: "name",
      header: "نام زمین",
    },
    {
      accessorKey: "roofed",
      header: "مسقف",
    },
    {
      accessorKey: "status",
      header: "وضعیت",
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
      <DataTable
        columns={tableColumns}
        data={allSubPlacesData?.Items ?? []}
        paginationMeta={createPaginationMeta(allSubPlacesData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListSubPlaces({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListSubPlaces({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListSubPlaces({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={subPlaceFormConfig}
            drawerTitle="زمین"
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
        <BackButton />
      </div>
    </div>
  );
}
