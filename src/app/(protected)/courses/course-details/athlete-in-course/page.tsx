"use client";

import { athleteInCourseApi } from "@/api/services/ApiService/athleteInCourseApi";
import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import BackButton from "@/components/shared/BackButton";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  currencyFormatter,
  numberFormatter,
} from "@/components/ui/data-table/formatters";
import { useApi } from "@/hooks/useApi";
import { toast } from "@/lib/toast/toast";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import {
  AthleteInCourse,
  AthleteInCourseGet,
  AthleteInCourseGetListParams,
} from "@/types/api/endpointTypes/athleteInCourse.types";

import {
  createPaginationMeta,
  generateFormConfig,
} from "@/utils/utillityFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { athleteInCourseFormConfig } from "./athleteInCourseFormConfig";

export default function CourseClassesPage() {
  const searchParam = useSearchParams();

  const courseId = searchParam.get("courseId");

  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<AthleteInCourseGetListParams>(
    {},
  );

  const {
    data: allAthleteInCoursesData,
    isLoading: getListLoading,
    execute: getListAthleteInCourses,
  } = useApi<APIGetTemplate<AthleteInCourse[]>, AthleteInCourseGetListParams>(
    athleteInCourseApi.getList,
  );

  const {
    data: athleteInCourseData,
    isLoading: getLoading,
    execute: getathleteInCourse,
  } = useApi<AthleteInCourseGet, { id: number }>(athleteInCourseApi.get);

  const { isLoading: addLoading, execute: addAthleteInCourse } = useApi<
    APIAddTemplateResponse<number>,
    any
  >(athleteInCourseApi.add, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formModalRef.current?.close();
      getListAthleteInCourses({
        ...filterItems,
        FilterCourseId: courseId || undefined,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { isLoading: editLoading, execute: editAthleteInCourse } = useApi<
    APIAddTemplateResponse,
    any
  >(athleteInCourseApi.edit, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formModalRef.current?.close();
      getListAthleteInCourses({
        ...filterItems,
        FilterCourseId: courseId || undefined,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const isSubmitting = addLoading || editLoading;

  useEffect(() => {
    getListAthleteInCourses({ FilterCourseId: courseId || undefined });
  }, []);

  const formConfig = generateFormConfig(athleteInCourseFormConfig, {
    values: formMode === "edit" ? athleteInCourseData || undefined : undefined,
  });

  const tableColumns: ColumnDef<AthleteInCourse>[] = [
    {
      accessorKey: "AthleteFullName",
      header: "نام و نام خانوادگی",
    },
    {
      accessorKey: "NationalCode",
      header: "کد ملی",
      meta: {
        formatter: numberFormatter,
      },
    },
    {
      accessorKey: "CourseName",
      header: "نام دوره",
    },
    {
      accessorKey: "CourseClassName",
      header: "نام کلاس دوره",
    },
    {
      accessorKey: "CourseRegisterAmount",
      header: "مبلغ ثبت نام دوره",
      meta: {
        formatter: currencyFormatter,
      },
    },
    {
      accessorKey: "FinalAmount",
      header: "مبلغ نهایی",
      meta: {
        formatter: currencyFormatter,
      },
    },
    {
      accessorKey: "PaymentTypeStr",
      header: "نوع پرداخت",
    },
    {
      accessorKey: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onEdit={() => {
            setFormMode("edit");
            getathleteInCourse({ id: row.original.AthleteInCourseId });
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
        data={allAthleteInCoursesData?.Items ?? []}
        paginationMeta={createPaginationMeta(allAthleteInCoursesData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListAthleteInCourses({
            ...filterItems,
            FilterCourseId: courseId || undefined,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListAthleteInCourses({
            ...filterItems,
            FilterCourseId: courseId || undefined,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          getListAthleteInCourses({
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
                addAthleteInCourse({
                  ...data,
                  CourseId: courseId || undefined,
                });
              } else if (formMode === "edit") {
                editAthleteInCourse({
                  ...data,
                  //   AthleteInCourseId: courseClassData?.CourseClassId,
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
