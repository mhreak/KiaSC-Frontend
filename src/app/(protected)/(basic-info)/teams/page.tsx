"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import {
  Team,
  TeamGet,
  TeamGetListParams,
} from "@/types/api/endpointTypes/team.types";
import { teamFormConfig } from "./teamFormConfig";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import { useApi } from "@/hooks/useApi";
import { teamApi } from "@/api/services/ApiService/teamApi";
import {
  createPaginationMeta,
  generateFilterConfig,
  generateFormConfig,
  toFieldOptions,
} from "@/utils/utillityFunctions";
import { toast } from "@/lib/toast/toast";
import {
  Sport,
  SportGetListParams,
} from "@/types/api/endpointTypes/sport.types";
import { sportApi } from "@/api/services/ApiService/sportApi";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { teamFilterConfig } from "./teamFilterConfig";

export default function TeamsPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<TeamGetListParams>({});

  const router = useTransitionRouter();

  const {
    data: allTeamsData,
    isLoading: getListLoading,
    execute: getListTeams,
  } = useApi<APIGetTemplate<Team[]>, TeamGetListParams>(teamApi.getList);

  const {
    data: teamData,
    isLoading: getLoading,
    execute: getTeam,
  } = useApi<TeamGet, { id: number }>(teamApi.get);

  const { isLoading: addLoading, execute: addTeam } = useApi<
    APIAddTemplateResponse<number>,
    any
  >(teamApi.add, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formModalRef.current?.close();
      getListTeams({
        ...filterItems,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { isLoading: editLoading, execute: editTeam } = useApi<
    APIAddTemplateResponse,
    any
  >(teamApi.edit, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formModalRef.current?.close();
      getListTeams({
        ...filterItems,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { data: allSportsData, execute: getAllSports } = useApi<
    APIGetTemplate<Sport[]>,
    SportGetListParams
  >(sportApi.getList);

  const isSubmitting = addLoading || editLoading;

  useEffect(() => {
    getListTeams();
    getAllSports();
  }, []);

  const formConfig = generateFormConfig(teamFormConfig, {
    values: formMode === "edit" ? teamData || undefined : undefined,
    options: {
      SportId: toFieldOptions(
        allSportsData?.Items ?? [],
        "SportName",
        "SportId",
      ),
    },
    fieldProps: {
      Gender: {
        defaultValue:
          formMode === "edit"
            ? teamData?.Gender
              ? "true"
              : "false"
            : undefined,
      },
    },
  });

  const filterConfig = generateFilterConfig(teamFilterConfig, {
    options: {
      FilterSportId: toFieldOptions(
        allSportsData?.Items ?? [],
        "SportName",
        "SportId",
      ),
    },
  });

  const tableColumns: ColumnDef<Team>[] = [
    {
      accessorKey: "TeamName",
      header: "نام تیم",
    },
    {
      accessorKey: "SportName",
      header: "رشته ورزشی",
    },
    {
      accessorKey: "Gender",
      header: "جنسیت",
      cell({ row }) {
        switch (row.original.Gender) {
          case true:
            return "مرد";
          case false:
            return "زن";
          default:
            return "مرد";
        }
      },
    },

    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onEdit={() => {
            setFormMode("edit");
            getTeam({ id: row.original.TeamId });
            formModalRef.current?.open();
          }}
          otherActions={[
            {
              onClick: () => {
                router.push(
                  `/teams/athlete-in-team/${row.original.TeamId}?name=${encodeURIComponent(`لیست اعضای تیم ${row.original.TeamName}`)}`,
                );
              },
              label: "مشاهده اعضا",
            },
            {
              onClick: () => {
                router.push(
                  `/teams/person-in-team/${row.original.TeamId}?name=${encodeURIComponent(`لیست افراد تیم ${row.original.TeamName}`)}`,
                );
              },
              label: "مشاهده افراد",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={filterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListTeams({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={tableColumns}
        data={allTeamsData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allTeamsData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListTeams({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListTeams({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListTeams({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={formConfig}
            onSubmit={(data) => {
              if (formMode === "add") addTeam(data);
              else if (formMode === "edit")
                editTeam({ ...data, TeamId: teamData?.TeamId });
            }}
            drawerTitle="تیم"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
            isSubmitting={isSubmitting}
            isLoading={getLoading}
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
