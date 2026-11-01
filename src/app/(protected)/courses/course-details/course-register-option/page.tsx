"use client";

import { FormMode } from "@/components/formBuilder/types";
import { useApi } from "@/hooks/useApi";
import { toast } from "@/lib/toast/toast";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";

import {
  createPaginationMeta,
  generateFormConfig,
  toFieldOptions,
} from "@/utils/utillityFunctions";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  numberFormatter,
  statusFormatter,
} from "@/components/ui/data-table/formatters";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import BackButton from "@/components/shared/BackButton";
import { courseRegisterOptionApi } from "@/api/services/ApiService/courseRegisterOptionApi";
import {
  CourseRegisterOption,
  CourseRegisterOptionGet,
  CourseRegisterOptionGetListParams,
} from "@/types/api/endpointTypes/courseRegisterOption.types";
import { courseRegisterOptionFormConfig } from "./courseRegisterOptionFormConfig";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";

export default function CourseRegisterOptionsPage() {
  const searchParam = useSearchParams();

  const courseId = searchParam.get("courseId");

  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] =
    useState<CourseRegisterOptionGetListParams>({});

  const {
    data: allCourseRegisterOptionData,
    isLoading: getListLoading,
    execute: getListCourseRegisterOption,
  } = useApi<
    APIGetTemplate<CourseRegisterOption[]>,
    CourseRegisterOptionGetListParams
  >(courseRegisterOptionApi.getList);

  const {
    data: courseRegisterOptionData,
    isLoading: getLoading,
    execute: getCourseRegisterOption,
  } = useApi<CourseRegisterOptionGet, { id: number }>(
    courseRegisterOptionApi.get,
  );

  const { isLoading: addLoading, execute: addCourseRegisterOption } = useApi<
    APIAddTemplateResponse<number>,
    any
  >(courseRegisterOptionApi.add, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formDrawerRef.current?.close();
      getListCourseRegisterOption({
        ...filterItems,
        CourseId: courseId || undefined,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { isLoading: editLoading, execute: editCourseRegisterOption } = useApi<
    APIAddTemplateResponse,
    any
  >(courseRegisterOptionApi.edit, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formDrawerRef.current?.close();
      getListCourseRegisterOption({
        ...filterItems,
        CourseId: courseId || undefined,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const isSubmitting = addLoading || editLoading;

  useEffect(() => {
    getListCourseRegisterOption({ CourseId: courseId || undefined });
  }, []);

  const formConfig = generateFormConfig(courseRegisterOptionFormConfig, {
    values:
      formMode === "edit" ? courseRegisterOptionData || undefined : undefined,
  });

  const tableColumns: ColumnDef<CourseRegisterOption>[] = [
    {
      accessorKey: "OptionName",
      header: "نام گزینه ی ثبت نامی",
    },
    {
      accessorKey: "Amount",
      header: "تعداد",
      meta: {
        formatter: numberFormatter,
      },
    },
    {
      accessorKey: "Active",
      header: "وضعیت",
      meta: {
        formatter: statusFormatter,
      },
    },
    {
      accessorKey: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onEdit={() => {
            setFormMode("edit");
            getCourseRegisterOption({ id: row.original.RegisterOptionId });
            formDrawerRef.current?.open();
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable
        columns={tableColumns}
        data={allCourseRegisterOptionData?.Items ?? []}
        paginationMeta={createPaginationMeta(allCourseRegisterOptionData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListCourseRegisterOption({
            ...filterItems,
            CourseId: courseId || undefined,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListCourseRegisterOption({
            ...filterItems,
            CourseId: courseId || undefined,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          getListCourseRegisterOption({
            ...filterItems,
            CourseId: courseId || undefined,
            PageNumber: page,
            PageSize: pageSize,
          });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={formConfig}
            onSubmit={(data) => {
              if (formMode === "add") {
                addCourseRegisterOption({
                  ...data,
                  CourseId: courseId || undefined,
                });
              } else if (formMode === "edit") {
                editCourseRegisterOption({
                  ...data,
                  RegisterOptionId: courseRegisterOptionData?.RegisterOptionId,
                  CourseId: courseId || undefined,
                });
              }
            }}
            drawerTitle="ورزشکار"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
            isSubmitting={isSubmitting}
            isLoading={getLoading}
          />
        </div>
        <BackButton />
      </div>
    </div>
  );
}
