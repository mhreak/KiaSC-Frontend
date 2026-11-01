"use client";

import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { useEffect, useRef, useState } from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import ActionItems from "@/components/shared/ActionItems";
import { FormMode } from "@/components/formBuilder/types";
import BackButton from "@/components/shared/BackButton";
import {
  AthleteInTeam,
  AthleteInTeamGetListParams,
} from "@/types/api/endpointTypes/athleteInTeam.types";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { athleteInTeamFormConfig } from "./athleteInTeamFormConfig";
import { athleteInTeamFilterConfig } from "./athleteInTeamFilterConfig";
import { useApi } from "@/hooks/useApi";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import { athleteInTeamApi } from "@/api/services/ApiService/athleteInTeamApi";
import { useParams } from "next/navigation";
import {
  createPaginationMeta,
  generateFormConfig,
  toFieldOptions,
} from "@/utils/utillityFunctions";
import { toast } from "@/lib/toast/toast";
import { athleteRoleApi } from "@/api/services/ApiService/athleteRoleApi";
import {
  AthleteRole,
  AthleteRoleGetListParams,
} from "@/types/api/endpointTypes/athleteRole.types";

export default function AthleteInTeamPage() {
  const { teamId } = useParams<{ teamId: string }>();

  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
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

  // const {
  //   data: athleteData,
  //   isLoading: getLoading,
  //   execute: getAthlete,
  // } = useApi<AthleteGet, { id: number }>(athleteApi.get);

  const { isLoading: addLoading, execute: addAthleteInTeam } = useApi<
    APIAddTemplateResponse<number>,
    any
  >(athleteInTeamApi.add, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formModalRef.current?.close();
      getListAthleteInTeams({
        ...filterItems,
        PageNumber: page,
        PageSize: pageSize,
        FilterTeamId: teamId,
      });
    },
  });

  // const { isLoading: editLoading, execute: editAthlete } = useApi<
  //   APIAddTemplateResponse,
  //   any
  // >(athleteApi.edit, {
  //   onSuccess(response) {
  //     toast.success(response.MessageList[0] || "");
  //     formDrawerRef.current?.close();
  //     getListAthletes({
  //       ...filterItems,
  //       PageNumber: page,
  //       PageSize: pageSize,
  //     });
  //   },
  // });

  const { data: allAthleteRolesData, execute: getListAthleteRoles } = useApi<
    APIGetTemplate<AthleteRole[]>,
    AthleteRoleGetListParams
  >(athleteRoleApi.getList);

  const isSubmitting = addLoading;
  // || editLoading;

  useEffect(() => {
    getListAthleteInTeams({ FilterTeamId: teamId });
    getListAthleteRoles();
  }, []);

  const athleteColumns: ColumnDef<AthleteInTeam>[] = [
    {
      accessorKey: "AthleteFullName",
      header: "نام و نام خانوادگی",
    },
    {
      accessorKey: "AthleteRoleName",
      header: "نقش",
    },

    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onEdit={() => {
            setFormMode("edit");
            formModalRef.current?.open();
          }}
          onDelete={() => {}}
        />
      ),
    },
  ];

  const formConfig = generateFormConfig(athleteInTeamFormConfig, {
    options: {
      AthleteRoleId: toFieldOptions(
        allAthleteRolesData?.Items ?? [],
        "AthleteRoleName",
        "AthleteRoleId",
      ),
    },
  });

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={athleteInTeamFilterConfig}
        onApplyFilters={() => {}}
      />
      <DataTable
        columns={athleteColumns}
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
            FilterTeamId: teamId,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListAthleteInTeams({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
            FilterTeamId: teamId,
          });
        }}
        onRefresh={() => {
          getListAthleteInTeams({
            ...filterItems,
            PageNumber: page,
            PageSize: pageSize,
            FilterTeamId: teamId,
          });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={formConfig}
            onSubmit={(data) => {
              if (formMode === "add") {
                addAthleteInTeam({
                  data: { ...data, TeamId: Number(teamId) },
                  teamId: teamId,
                });
              }
            }}
            drawerTitle="عضو"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
            isSubmitting={isSubmitting}
            modalContentClassName="md:w-[55vw]"
          />
        </div>
        <BackButton />
      </div>
    </div>
  );
}
