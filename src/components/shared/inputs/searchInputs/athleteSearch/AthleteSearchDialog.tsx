import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Athlete } from "@/types/api/endpointTypes/athlete.types";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Search, X } from "lucide-react";

const sampleData: Athlete[] = [
  {
    id: "ivsjekflisjdjj-aejfaek",
    fullNama: "محمد هادی رادان",
    fatherName: "محمد تقی",
    nationalCole: "1272244581",
    gender: 2,
    genderStr: "مرد",
    ageGroup: "",
  },
];

interface Props {
  onAthleteSelect: (id: string, name: string) => void;
}

export function AthleteSearchDialog({ onAthleteSelect }: Readonly<Props>) {
  const athleteColumns: ColumnDef<Athlete>[] = [
    {
      accessorKey: "fullNama",
      header: "نام و نام خانوادگی",
    },
    {
      accessorKey: "fatherName",
      header: "نام پدر",
    },
    {
      accessorKey: "nationalCole",
      header: "کد ملی",
      meta: {
        formatter: numberFormatter,
      },
    },

    {
      accessorKey: "genderStr",
      header: "جنسیت",
    },
    {
      accessorKey: "ageGroup",
      header: "گروه سنی",
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
      <DialogContent className="md:max-w-full md:w-fit h-170 overflow-auto">
        <DialogHeader>
          <DialogTitle className={"font-bold text-xl text-center w-full"}>
            جستجوی ورزشکاران
          </DialogTitle>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">
          <DataTable
            columns={athleteColumns}
            data={sampleData}
            onPageChanged={(currentPage) => {}}
            onPageSizeChanged={(currentPageSize) => {}}
            selectionMode="single"
            onSelectionChange={(rows) => {
              if (rows.length > 0) {
                onAthleteSelect(rows[0].id, rows[0].fullNama);
              }
            }}
            mode="modal"
          />
        </div>

        <DialogFooter className="flex flex-ro items-center py-1 md:justify-between">
          <DialogClose
            render={
              <Button variant={"success"}>
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
