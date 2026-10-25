"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  Course,
  CourseGet,
  CourseGetListParams,
} from "@/types/api/endpointTypes/course.types";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import React, { useEffect, useRef, useState } from "react";
import { courseFormConfig } from "./courseFormConfig";
import { courseFilterConfig } from "./courseFilterConfig";
import { useApi } from "@/hooks/useApi";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import { courseApi } from "@/api/services/ApiService/courseApi";
import {
  createPaginationMeta,
  generateFilterConfig,
  generateFormConfig,
  toFieldOptions,
} from "@/utils/utillityFunctions";
import { Term, TermGetListParams } from "@/types/api/endpointTypes/term.types";
import { termApi } from "@/api/services/ApiService/termApi";
import {
  Sport,
  SportGetListParams,
} from "@/types/api/endpointTypes/sport.types";
import { sportApi } from "@/api/services/ApiService/sportApi";
import {
  Place,
  PlaceGetListParams,
} from "@/types/api/endpointTypes/place.types";
import { placeApi } from "@/api/services/ApiService/placeApi";
import {
  SubPlace,
  SubPlaceGetListParams,
} from "@/types/api/endpointTypes/subPlace.types";
import { subPlaceApi } from "@/api/services/ApiService/subPlaceApi";
import { toast } from "@/lib/toast/toast";

export default function CoursesPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<CourseGetListParams>({});

  const router = useTransitionRouter();

  const {
    data: allCoursesData,
    isLoading: getListLoading,
    execute: getListCourses,
  } = useApi<APIGetTemplate<Course[]>, CourseGetListParams>(courseApi.getList);

  const { isLoading: addLoading, execute: addCourse } = useApi<
    APIAddTemplateResponse<number>,
    any
  >(courseApi.add, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formDrawerRef.current?.close();
      getListCourses({
        ...filterItems,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { isLoading: editLoading, execute: editCourse } = useApi<
    APIAddTemplateResponse,
    any
  >(courseApi.edit, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formDrawerRef.current?.close();
      getListCourses({
        ...filterItems,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { data: allTermsData, execute: getListTerms } = useApi<
    APIGetTemplate<Term[]>,
    TermGetListParams
  >(termApi.getList);

  const { data: allSportsData, execute: getAllSports } = useApi<
    APIGetTemplate<Sport[]>,
    SportGetListParams
  >(sportApi.getList);

  const { data: allPlacesData, execute: getListPlaces } = useApi<
    APIGetTemplate<Place[]>,
    PlaceGetListParams
  >(placeApi.getList);

  const { data: allSubPlacesData, execute: getListSubPlaces } = useApi<
    APIGetTemplate<SubPlace[]>,
    SubPlaceGetListParams
  >(subPlaceApi.getList);

  const isSubmitting = addLoading;
  // || editLoading;

  useEffect(() => {
    getListCourses();
    getListTerms();
    getAllSports();
    getListPlaces();
    getListSubPlaces();
  }, []);

  const tableColumns: ColumnDef<Course>[] = [
    {
      accessorKey: "CourseName",
      header: "نام دوره آموزشی",
    },
    {
      accessorKey: "TermName",
      header: "ترم",
    },

    {
      accessorKey: "SportName",
      header: "رشته ورزشی",
    },
    {
      accessorKey: "Gender",
      header: "جنسیت",
      cell({ row }) {
        if (row.original.Gender) return "آقا";
        else return "خانم";
      },
    },
    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onView={() => {
            router.push(
              `/courses/course-details/${row.original.CourseId}?name=${"منوی دسترسی " + row.original.CourseName}`,
            );
          }}
        />
      ),
    },
  ];

  const formConfig = generateFormConfig(courseFormConfig, {
    options: {
      SportId: toFieldOptions(
        allSportsData?.Items ?? [],
        "SportName",
        "SportId",
      ),
      TermId: toFieldOptions(allTermsData?.Items ?? [], "TermName", "TermId"),
      PlaceId: toFieldOptions(
        allPlacesData?.Items ?? [],
        "PlaceName",
        "PlaceId",
      ),
      SubPlaceId: toFieldOptions(
        allSubPlacesData?.Items ?? [],
        "SubPlaceName",
        "SubPlaceId",
      ),
    },
  });

  const filterConfig = generateFilterConfig(courseFilterConfig, {
    options: {
      FilterTermId: toFieldOptions(
        allTermsData?.Items ?? [],
        "TermName",
        "TermId",
      ),
      FilterSportId: toFieldOptions(
        allSportsData?.Items ?? [],
        "SportName",
        "SportId",
      ),
      FilterPlaceId: toFieldOptions(
        allPlacesData?.Items ?? [],
        "PlaceName",
        "PlaceId",
      ),
    },
  });

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={filterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListCourses({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={tableColumns}
        data={allCoursesData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allCoursesData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListCourses({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListCourses({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          getListCourses({
            ...filterItems,
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
                addCourse(data);
              }
            }}
            drawerTitle="دوره ی آموزشی"
            formMode={formMode}
            isSubmitting={isSubmitting}
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
