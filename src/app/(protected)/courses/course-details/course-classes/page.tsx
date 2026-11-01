"use client";

import { courseClassApi } from "@/api/services/ApiService/courseClassesApi";
import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import BackButton from "@/components/shared/BackButton";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { DataTable } from "@/components/ui/data-table/data-table";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import { useApi } from "@/hooks/useApi";
import { toast } from "@/lib/toast/toast";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import {
  CourseClass,
  CourseClasseGetListParams,
  CourseClassGet,
} from "@/types/api/endpointTypes/courseClasses.types";
import {
  createPaginationMeta,
  generateFormConfig,
} from "@/utils/utillityFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { courseClassFormConfig } from "./courseClassFormConfig";

export default function CourseClassesPage() {
  const searchParam = useSearchParams();

  const courseId = searchParam.get("courseId");

  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<CourseClasseGetListParams>({});

  const {
    data: allCourseClassesData,
    isLoading: getListLoading,
    execute: getListCourseClasses,
  } = useApi<APIGetTemplate<CourseClass[]>, CourseClasseGetListParams>(
    courseClassApi.getList,
  );

  const {
    data: courseClassData,
    isLoading: getLoading,
    execute: getcourseClass,
  } = useApi<CourseClassGet, { id: number }>(courseClassApi.get);

  const { isLoading: addLoading, execute: addCourseClass } = useApi<
    APIAddTemplateResponse<number>,
    any
  >(courseClassApi.add, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formModalRef.current?.close();
      getListCourseClasses({
        ...filterItems,
        CourseId: courseId || undefined,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { isLoading: editLoading, execute: editCourseClass } = useApi<
    APIAddTemplateResponse,
    any
  >(courseClassApi.edit, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formModalRef.current?.close();
      getListCourseClasses({
        ...filterItems,
        CourseId: courseId || undefined,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const isSubmitting = addLoading || editLoading;

  useEffect(() => {
    getListCourseClasses({ CourseId: courseId || undefined });
  }, []);

  const formConfig = generateFormConfig(courseClassFormConfig, {
    values: formMode === "edit" ? courseClassData || undefined : undefined,
  });

  const tableColumns: ColumnDef<CourseClass>[] = [
    {
      accessorKey: "ClassName",
      header: "نام کلاس",
    },
    {
      accessorKey: "AthleteCount",
      header: "تعداد ورزشکاران",
      meta: {
        formatter: numberFormatter,
      },
    },
    {
      accessorKey: "PersonCount",
      header: "تعدد افراد",
      meta: {
        formatter: numberFormatter,
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
            getcourseClass({ id: row.original.CourseClassId });
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
        data={allCourseClassesData?.Items ?? []}
        paginationMeta={createPaginationMeta(allCourseClassesData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListCourseClasses({
            ...filterItems,
            CourseId: courseId || undefined,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListCourseClasses({
            ...filterItems,
            CourseId: courseId || undefined,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          getListCourseClasses({
            ...filterItems,
            CourseId: courseId || undefined,
            PageNumber: page,
            PageSize: pageSize,
          });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={formConfig}
            onSubmit={(data) => {
              if (formMode === "add") {
                addCourseClass({ ...data, CourseId: courseId || undefined });
              } else if (formMode === "edit") {
                editCourseClass({
                  ...data,
                  CourseClassId: courseClassData?.CourseClassId,
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
