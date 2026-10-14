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
import { termSelectFilterConfig } from "./termSelectFilterConfig";
import { Term } from "@/types/api/endpointTypes/term.types";

interface Props {
  selectedTerms: Term[];
  onSelectionChange: (terms: Term[]) => void;
}

const sampleData: Term[] = [
  {
    id: "1",
    name: "بهار",
    year: 1405,
    season: "بهار",
  },
];

export function TermSelectDialog({
  selectedTerms,
  onSelectionChange,
}: Readonly<Props>) {
  const [open, setOpen] = useState(false);

  const [tempSelectedTerms, setTempSelectedTerms] = useState<Term[]>([]);

  const termColumns: ColumnDef<Term>[] = [
    {
      accessorKey: "name",
      header: "نام ترم",
    },
    {
      accessorKey: "year",
      header: "سال",
    },
    {
      accessorKey: "season",
      header: "فصل",
    },
  ];

  const handleOpen = () => {
    setTempSelectedTerms(selectedTerms);
    setOpen(true);
  };

  const handleConfirm = () => {
    onSelectionChange(tempSelectedTerms);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedTerms(selectedTerms);
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
            انتخاب ترم
          </DialogTitle>
        </DialogHeader>

        <FilterRenderer
          config={termSelectFilterConfig}
          onApplyFilters={() => {}}
        />

        <div className="-mx-4 max-h-[80vh] overflow-y-auto px-4 no-scrollbar">
          <DataTable
            columns={termColumns}
            data={sampleData}
            selectionMode="multiple"
            mode="modal"
            onPageChanged={() => {}}
            onPageSizeChanged={() => {}}
            onSelectionChange={(rows) => {
              setTempSelectedTerms(rows);
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
