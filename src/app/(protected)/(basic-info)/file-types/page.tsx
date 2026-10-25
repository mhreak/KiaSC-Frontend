"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import {
  FileType,
  FileTypeGetListParams,
} from "@/types/api/endpointTypes/fileType.types";
import { fileTypeFormConfig } from "./fileTypeFormConfig";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { useApi } from "@/hooks/useApi";
import { fileTypeApi } from "@/api/services/ApiService/fileTypeApi";

export default function FileTypesPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const {
    data: allFileTypesData,
    isLoading: getListLoading,
    execute: getListFileTypes,
  } = useApi<APIGetTemplate<FileType[]>, FileTypeGetListParams>(
    fileTypeApi.getList,
  );

  useEffect(() => {
    getListFileTypes();
  }, []);

  const tableColumns: ColumnDef<FileType>[] = [
    {
      accessorKey: "FileTypeName",
      header: "نام",
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
      <DataTable
        columns={tableColumns}
        data={allFileTypesData?.Items ?? []}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListFileTypes({
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListFileTypes({
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          getListFileTypes({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={fileTypeFormConfig}
            drawerTitle="نوع فایل"
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
