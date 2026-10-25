"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { DataTable } from "@/components/ui/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";

import {
  Place,
  PlaceGetListParams,
} from "@/types/api/endpointTypes/place.types";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { placeFormConfig } from "./placeFormConfig";
import { Button } from "@/components/ui/button";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { placeApi } from "@/api/services/ApiService/placeApi";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { placeFilterConfig } from "./placeFilterConfig";

export default function PlacesPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<PlaceGetListParams>({});

  const router = useTransitionRouter();

  const {
    data: allPlacesData,
    isLoading: getListLoading,
    execute: getListPlaces,
  } = useApi<APIGetTemplate<Place[]>, PlaceGetListParams>(placeApi.getList);

  useEffect(() => {
    getListPlaces();
  }, []);

  const tableColumns: ColumnDef<Place>[] = [
    {
      accessorKey: "PlaceName",
      header: "نام ورزشگاه",
    },
    {
      accessorKey: "ManagerName",
      header: "مدیریت",
    },
    {
      accessorKey: "ContactPersonName",
      header: "نام و نام خانوادگی رابط",
    },

    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <ActionItems
          row={row}
          onEdit={() => {
            setFormMode("edit");
            formDrawerRef.current?.open();
          }}
          otherActions={[
            {
              onClick: () => {
                router.push(
                  `/places/sub-places/${row.original.PlaceId}?name=لیست زمین ها و سالن های ${row.original.PlaceName}`,
                );
              },
              label: "لیست زمین ها",
            },
          ]}
        />
      ),
    },
  ];
  return (
    <div className="space-y-5">
      <FilterRenderer
        config={placeFilterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListPlaces({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={tableColumns}
        data={allPlacesData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allPlacesData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListPlaces({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListPlaces({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListPlaces({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={placeFormConfig}
            drawerTitle="ورزشگاه"
            formMode={formMode}
            onTriggerButtonClick={() => {
              setFormMode("add");
            }}
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
