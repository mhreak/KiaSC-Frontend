import { courseApi } from "@/api/services/ApiService/courseApi";
import { courseFilterConfig } from "@/app/(protected)/courses/courseFilterConfig";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import {
  Course,
  CourseGetListParams,
} from "@/types/api/endpointTypes/course.types";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  onCourseSelect: (id: number, name: string) => void;
  onConfirm?: () => void;
}

export function CourseSearchDialog({
  onCourseSelect,
  onConfirm,
}: Readonly<Props>) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<CourseGetListParams>({});

  const {
    data: allCoursesData,
    isLoading: getListLoading,
    execute: getListCourses,
  } = useApi<APIGetTemplate<Course[]>, CourseGetListParams>(courseApi.getList);

  useEffect(() => {
    getListCourses();
  }, []);

  const athleteColumns: ColumnDef<Course>[] = [
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
  ];
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="secondary"
            className="absolute left-1.5 top-1/2 -translate-y-1/2"
            size={"icon-lg"}
          >
            <Search className="size-5" />
          </Button>
        }
      />
      <DialogContent className="md:max-w-5xl md: h-170 overflow-auto">
        <DialogHeader>
          <DialogTitle className={"font-bold text-xl text-center w-full"}>
            جستجوی دوره
          </DialogTitle>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4 space-y-5">
          <FilterRenderer
            config={courseFilterConfig}
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
            columns={athleteColumns}
            data={allCoursesData?.Items ?? []}
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
            selectionMode="single"
            onSelectionChange={(rows) => {
              if (rows.length > 0) {
                onCourseSelect(rows[0].CourseId, rows[0].CourseName);
              }
            }}
            mode="modal"
          />
        </div>

        <DialogFooter className="flex flex-ro items-center py-1 md:justify-between">
          <DialogClose
            render={
              <Button variant={"success"} onClick={onConfirm}>
                <Check strokeWidth={3} />
                تایید
              </Button>
            }
          />
          <DialogClose
            render={
              <Button variant="destructive">
                <X strokeWidth={3} />
                بستن
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
