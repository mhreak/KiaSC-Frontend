"use client";

import { courseSessionApi } from "@/api/services/ApiService/courseSessionApi";
import { FormMode } from "@/components/formBuilder/types";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { useApi } from "@/hooks/useApi";
import { toast } from "@/lib/toast/toast";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import {
  CourseSession,
  CourseSessionGet,
  CourseSessionGetListParams,
} from "@/types/api/endpointTypes/courseSession.types";
import {
  createPaginationMeta,
  generateFormConfig,
  toFieldOptions,
} from "@/utils/utillityFunctions";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { courseSessionFormConfig } from "./courseSessionFormConfig";
import { ColumnDef } from "@tanstack/react-table";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  CourseClass,
  CourseClasseGetListParams,
} from "@/types/api/endpointTypes/courseClasses.types";
import { courseClassApi } from "@/api/services/ApiService/courseClassesApi";
import BackButton from "@/components/shared/BackButton";

export default function CourseSessionsPage() {
  const searchParam = useSearchParams();

  const courseId = searchParam.get("courseId");

  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<CourseSessionGetListParams>(
    {},
  );

  const {
    data: allCourseSessionData,
    isLoading: getListLoading,
    execute: getListCourseSession,
  } = useApi<APIGetTemplate<CourseSession[]>, CourseSessionGetListParams>(
    courseSessionApi.getList,
  );

  const {
    data: courseSessionData,
    isLoading: getLoading,
    execute: getCourseSession,
  } = useApi<CourseSessionGet, { id: number }>(courseSessionApi.get);

  const { isLoading: addLoading, execute: addCourseSession } = useApi<
    APIAddTemplateResponse<number>,
    any
  >(courseSessionApi.add, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formModalRef.current?.close();
      getListCourseSession({
        ...filterItems,
        FilterCourseId: courseId || undefined,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { isLoading: editLoading, execute: editCourseSession } = useApi<
    APIAddTemplateResponse,
    any
  >(courseSessionApi.edit, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formModalRef.current?.close();
      getListCourseSession({
        ...filterItems,
        FilterCourseId: courseId || undefined,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { data: allCourseClassesData, execute: getListCourseClasses } = useApi<
    APIGetTemplate<CourseClass[]>,
    CourseClasseGetListParams
  >(courseClassApi.getList);

  const isSubmitting = addLoading || editLoading;

  useEffect(() => {
    getListCourseSession({ FilterCourseId: courseId || undefined });
    getListCourseClasses({ CourseId: courseId || undefined });
  }, []);

  const formConfig = generateFormConfig(courseSessionFormConfig, {
    values: formMode === "edit" ? courseSessionData || undefined : undefined,
    options: {
      CourseClassId: toFieldOptions(
        allCourseClassesData?.Items ?? [],
        "ClassName",
        "CourseClassId",
      ),
    },
  });

  const tableColumns: ColumnDef<CourseSession>[] = [
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
            getCourseSession({ id: row.original.CourseSessionId });
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
        data={allCourseSessionData?.Items ?? []}
        paginationMeta={createPaginationMeta(allCourseSessionData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListCourseSession({
            ...filterItems,
            FilterCourseId: courseId || undefined,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListCourseSession({
            ...filterItems,
            FilterCourseId: courseId || undefined,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          getListCourseSession({
            ...filterItems,
            FilterCourseId: courseId || undefined,
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
                addCourseSession({
                  ...data,
                  CourseId: courseId || undefined,
                });
              } else if (formMode === "edit") {
                editCourseSession({
                  ...data,
                  CourseSessionId: courseSessionData?.CourseSessionId,
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
            modalContentClassName="md:w-[55vw]"
          />
        </div>
        <BackButton />
      </div>
    </div>
  );
}
