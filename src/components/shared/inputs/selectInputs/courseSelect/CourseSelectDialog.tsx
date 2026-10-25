"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { courseSelectFilterConfig } from "./courseSelectFilterConfig";
import { Course } from "@/types/api/endpointTypes/course.types";

interface Props {
  selectedCourses: Course[];
  onSelectionChange: (courses: Course[]) => void;
}

export function CourseSelectDialog({
  selectedCourses,
  onSelectionChange,
}: Readonly<Props>) {
  const [open, setOpen] = useState(false);

  const [tempSelectedCourses, setTempSelectedCourses] = useState<Course[]>([]);

  const courseColumns: ColumnDef<Course>[] = [
    {
      accessorKey: "name",
      header: "نام دورۀ آموزشی",
    },
    {
      accessorKey: "sport",
      header: "رشتۀ ورزشی",
    },
    {
      accessorKey: "term",
      header: "ترم",
    },
    {
      accessorKey: "gender",
      header: "جنسیت",
      cell: ({ row }) => {
        switch (row.original.genderStr) {
          case "male":
            return "مرد";
          case "female":
            return "زن";
        }
      },
    },
  ];

  const handleOpen = () => {
    setTempSelectedCourses(selectedCourses);
    setOpen(true);
  };

  const handleConfirm = () => {
    onSelectionChange(tempSelectedCourses);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedCourses(selectedCourses);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            size="icon-lg"
            className="shrink-0"
            onClick={handleOpen}
          >
            <Plus className="size-5" />
          </Button>
        }
      />

      <DialogContent className="h-170 overflow-auto md:w-fit md:max-w-full">
        <DialogHeader>
          <DialogTitle className="w-full text-center text-xl font-bold">
            انتخاب دوره‌های آموزشی
          </DialogTitle>
        </DialogHeader>

        <FilterRenderer
          config={courseSelectFilterConfig}
          onApplyFilters={() => {}}
        />

        <div className="-mx-4 max-h-[80vh] overflow-y-auto px-4 no-scrollbar">
          <DataTable
            columns={courseColumns}
            data={[]}
            selectionMode="multiple"
            mode="modal"
            onPageChanged={() => {}}
            onPageSizeChanged={() => {}}
            onSelectionChange={(rows) => {
              setTempSelectedCourses(rows);
            }}
          />
        </div>

        <DialogFooter className="flex flex-row items-center py-1 md:justify-between">
          <Button type="button" variant="success" onClick={handleConfirm}>
            <Check strokeWidth={3} />
            تأیید
          </Button>

          <Button type="button" variant="destructive" onClick={handleCancel}>
            <X strokeWidth={3} />
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
