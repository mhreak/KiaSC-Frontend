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
import { sportSelectFilterConfig } from "./sportSelectFilterConfig";
import { Sport } from "./SportSelect";

interface Props {
  selectedSports: Sport[];
  onSelectionChange: (sports: Sport[]) => void;
}

const sampleData: Sport[] = [
  {
    id: "1",
    name: "فوتبال",
  },
  {
    id: "2",
    name: "والیبال",
  },
  {
    id: "3",
    name: "بسکتبال",
  },
  {
    id: "4",
    name: "شنا",
  },
  {
    id: "5",
    name: "کشتی",
  },
  {
    id: "6",
    name: "کاراته",
  },
  {
    id: "7",
    name: "تکواندو",
  },
  {
    id: "8",
    name: "جودو",
  },
];

export function SportSelectDialog({
  selectedSports,
  onSelectionChange,
}: Readonly<Props>) {
  const [open, setOpen] = useState(false);

  const [tempSelectedSports, setTempSelectedSports] = useState<Sport[]>([]);

  const sportColumns: ColumnDef<Sport>[] = [
    {
      accessorKey: "id",
      header: "شناسۀ رشتۀ ورزشی",
    },
    {
      accessorKey: "name",
      header: "نام رشتۀ ورزشی",
    },
  ];

  const handleOpen = () => {
    setTempSelectedSports(selectedSports);
    setOpen(true);
  };

  const handleConfirm = () => {
    onSelectionChange(tempSelectedSports);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedSports(selectedSports);
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
            انتخاب ورزش
          </DialogTitle>
        </DialogHeader>

        <FilterRenderer
          config={sportSelectFilterConfig}
          onApplyFilters={() => {}}
        />

        <div className="-mx-4 max-h-[80vh] overflow-y-auto px-4 no-scrollbar">
          <DataTable
            columns={sportColumns}
            data={sampleData}
            selectionMode="multiple"
            mode="modal"
            onPageChanged={() => {}}
            onPageSizeChanged={() => {}}
            onSelectionChange={(rows) => {
              setTempSelectedSports(rows);
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
