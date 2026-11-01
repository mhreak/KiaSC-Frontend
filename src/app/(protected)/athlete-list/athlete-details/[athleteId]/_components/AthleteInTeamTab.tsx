import { athleteInTeamApi } from "@/api/services/ApiService/athleteInTeamApi";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { DataTable } from "@/components/ui/data-table/data-table";

import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import {
  AthleteInTeam,
  AthleteInTeamGetListParams,
} from "@/types/api/endpointTypes/athleteInTeam.types";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

interface AthleteInTeamTabProps {
  athleteId: string;
}

export default function AthleteInTeamTab({ athleteId }: AthleteInTeamTabProps) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<AthleteInTeamGetListParams>(
    {},
  );

  const {
    data: allAthletesInTeamData,
    isLoading: getListLoading,
    execute: getListAthleteInTeams,
  } = useApi<APIGetTemplate<AthleteInTeam[]>, AthleteInTeamGetListParams>(
    athleteInTeamApi.getList,
  );

  useEffect(() => {
    getListAthleteInTeams({ FilterAthleteId: athleteId });
  }, []);

  const tableColumns: ColumnDef<AthleteInTeam>[] = [
    {
      accessorKey: "AthleteFullName",
      header: "نام و نام خانوادگی",
    },
    {
      accessorKey: "TeamName",
      header: "تیم",
    },
    {
      accessorKey: "AthleteRoleName",
      header: "نقش",
    },
    // {
    //   id: "actions",
    //   header: "عملیات",
    //   cell: ({ row }) => (
    //     <ActionItems
    //       row={row}
    //       onEdit={() => {
    //         setFormMode("edit");
    //         getAthlete({ id: row.original.AthleteId });
    //         formDrawerRef.current?.open();
    //       }}
    //       onView={() => {
    //         router.push(
    //           `/athlete-list/athlete-details/${row.original.AthleteId}`,
    //         );
    //       }}
    //       onDelete={() => {}}
    //     />
    //   ),
    // },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={[]}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListAthleteInTeams({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
            FilterAthleteId: athleteId,
          });
        }}
      />
      <DataTable
        columns={tableColumns}
        data={allAthletesInTeamData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allAthletesInTeamData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListAthleteInTeams({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
            FilterAthleteId: athleteId,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListAthleteInTeams({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
            FilterAthleteId: athleteId,
          });
        }}
        onRefresh={() => {
          getListAthleteInTeams({
            ...filterItems,
            PageNumber: page,
            PageSize: pageSize,
            FilterAthleteId: athleteId,
          });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          {/* <Button variant={"warning"}>
            <FileChartColumn />
            دانلود فایل اکسل
          </Button> */}
        </div>
      </div>
    </div>
  );
}
