"use client";

import { courseClassesApi } from "@/api/services/ApiService/courseClassesApi";
import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import BackButton from "@/components/shared/BackButton";
import { FormDrawerRef } from "@/components/shared/FormDrawer";
import { DataTable } from "@/components/ui/data-table/data-table";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import {
  CourseClass,
  CourseClasseGetListParams,
} from "@/types/api/endpointTypes/courseClasses.types";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CourseClassesPage() {
  const searchParam = useSearchParams();

  const courseId = searchParam.get("courseId");

  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<CourseClasseGetListParams>({});

  const {
    data: allCourseClassesData,
    isLoading: getListLoading,
    execute: getListCourseClasses,
  } = useApi<APIGetTemplate<CourseClass[]>, CourseClasseGetListParams>(
    courseClassesApi.getList,
  );

  useEffect(() => {
    getListCourseClasses({ CourseId: courseId || undefined });
  }, []);

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
          {/* <FormDrawer
            ref={formDrawerRef}
            formConfig={formConfig}
            onSubmit={(data) => {
              if (formMode === "add") {
                console.log(data);
                addAthlete(data);
              } else if (formMode === "edit") {
                editAthlete({ AthleteId: athleteData?.AthleteId, ...data });
              }
            }}
            drawerTitle="ورزشکار"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
            isSubmitting={isSubmitting}
            isLoading={getLoading}
            onInvalid={(errors) => {
              console.log(errors);
            }}
          /> */}
        </div>
        <BackButton />
      </div>
    </div>
  );
}
