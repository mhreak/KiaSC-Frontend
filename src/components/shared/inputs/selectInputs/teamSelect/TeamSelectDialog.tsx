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
import { Team } from "./TeamSelect";
import { teamSelectFilterConfig } from "./teamSelectFilterConfig";

interface Props {
  selectedTeams: Team[];
  onSelectionChange: (teams: Team[]) => void;
}

const sampleData: Team[] = [
  {
    id: "1",
    name: "زیر 13 سال",
    sport: "فوتبال",
    gender: "male",
  },
];

export function TeamSelectDialog({
  selectedTeams,
  onSelectionChange,
}: Readonly<Props>) {
  const [open, setOpen] = useState(false);

  const [tempSelectedTeams, setTempSelectedTeams] = useState<Team[]>([]);

  const teamColumns: ColumnDef<Team>[] = [
    {
      accessorKey: "name",
      header: "نام تیم",
    },
    {
      accessorKey: "sport",
      header: "رشتۀ ورزشی",
    },
    {
      accessorKey: "gender",
      header: "جنسیت",
      cell: ({ row }) => {
        switch (row.original.gender) {
          case "male":
            return "مرد";
          case "female":
            return "زن";
        }
      },
    },
  ];

  const handleOpen = () => {
    setTempSelectedTeams(selectedTeams);
    setOpen(true);
  };

  const handleConfirm = () => {
    onSelectionChange(tempSelectedTeams);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedTeams(selectedTeams);
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
            انتخاب تیم‌ها
          </DialogTitle>
        </DialogHeader>

        <FilterRenderer
          config={teamSelectFilterConfig}
          onApplyFilters={() => {}}
        />

        <div className="-mx-4 max-h-[80vh] overflow-y-auto px-4 no-scrollbar">
          <DataTable
            columns={teamColumns}
            data={sampleData}
            selectionMode="multiple"
            mode="modal"
            onPageChanged={() => {}}
            onPageSizeChanged={() => {}}
            onSelectionChange={(rows) => {
              setTempSelectedTeams(rows);
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
