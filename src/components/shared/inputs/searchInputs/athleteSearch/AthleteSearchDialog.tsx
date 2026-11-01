import { athleteApi } from "@/api/services/ApiService/athleteApi";
import { athleteListFilterConfig } from "@/app/(protected)/athlete-list/athleteListFilterConfig";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  genderFormatter,
  numberFormatter,
} from "@/components/ui/data-table/formatters";
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
  Athlete,
  AthleteGetListParams,
} from "@/types/api/endpointTypes/athlete.types";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  onAthleteSelect: (id: number, name: string) => void;
}

export function AthleteSearchDialog({ onAthleteSelect }: Readonly<Props>) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<AthleteGetListParams>({});

  const {
    data: allAthletesData,
    isLoading: getListLoading,
    execute: getListAthletes,
  } = useApi<APIGetTemplate<Athlete[]>, AthleteGetListParams>(
    athleteApi.getList,
  );

  useEffect(() => {
    getListAthletes();
  }, []);

  const athleteColumns: ColumnDef<Athlete>[] = [
    {
      accessorKey: "FullName",
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
      accessorKey: "Mobile",
      header: "تلفن همراه",
      meta: {
        formatter: numberFormatter,
      },
    },

    {
      accessorKey: "Gender",
      header: "جنسیت",
      meta: {
        formatter: genderFormatter,
      },
    },
    {
      accessorKey: "AgeGroupName",
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
      <DialogContent className="md:max-w-5xl md: h-170 overflow-auto">
        <DialogHeader>
          <DialogTitle className={"font-bold text-xl text-center w-full"}>
            جستجوی ورزشکاران
          </DialogTitle>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4 space-y-5">
          <FilterRenderer
            config={athleteListFilterConfig}
            onApplyFilters={(filterData) => {
              setFilterItems(filterData);
              setPage(1);
              getListAthletes({
                ...filterData,
                PageNumber: 1,
                PageSize: pageSize,
              });
            }}
          />
          <DataTable
            columns={athleteColumns}
            data={allAthletesData?.Items ?? []}
            paginationMeta={createPaginationMeta(allAthletesData)}
            isLoading={getListLoading}
            onPageChanged={(currentPage) => {
              setPage(currentPage);
              getListAthletes({
                ...filterItems,
                PageNumber: currentPage,
                PageSize: pageSize,
              });
            }}
            onPageSizeChanged={(currentPageSize) => {
              setPageSize(currentPageSize);
              setPage(1);
              getListAthletes({
                ...filterItems,
                PageNumber: 1,
                PageSize: currentPageSize,
              });
            }}
            onRefresh={() => {
              getListAthletes({
                ...filterItems,
                PageNumber: page,
                PageSize: pageSize,
              });
            }}
            selectionMode="single"
            onSelectionChange={(rows) => {
              if (rows.length > 0) {
                onAthleteSelect(rows[0].AthleteId, rows[0].FullName);
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
