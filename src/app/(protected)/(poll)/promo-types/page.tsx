"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import {
  PromoType,
  PromoTypeGetListParams,
} from "@/types/api/endpointTypes/promoType.types";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { promoTypeFormConfig } from "./promoTypeFormConfig";
import { FormModal, FormModalRef } from "@/components/shared/FormModal";
import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { promoTypeApi } from "@/api/services/ApiService/promoTypeApi";
import { createPaginationMeta } from "@/utils/utillityFunctions";

export default function PromoTypesPage() {
  const formModalRef = useRef<FormModalRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const router = useTransitionRouter();

  const {
    data: allPromoTypesData,
    isLoading: getListLoading,
    execute: getListPromoTypes,
  } = useApi<APIGetTemplate<PromoType[]>, PromoTypeGetListParams>(
    promoTypeApi.getList,
  );

  useEffect(() => {
    getListPromoTypes();
  }, []);

  const promoTypeColumns: ColumnDef<PromoType>[] = [
    {
      accessorKey: "PromoTypeName",
      header: "نام",
    },
    {
      accessorKey: "Active",
      header: "وضعیت",
      cell: ({ row }) => {
        switch (row.original.Active) {
          case true:
            return "فعال";
          case false:
            return "غیر فعال";
        }
      },
    },
    {
      accessorKey: "AthleteCount",
      header: "تعداد ورزشکاران",
      meta: {
        formatter: numberFormatter,
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
            formModalRef.current?.open();
          }}
          otherActions={[
            {
              onClick: () => {
                router.push(`/athlete-list`);
              },
              label: "ورزشکاران",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable
        columns={promoTypeColumns}
        data={allPromoTypesData?.Items ?? []}
        paginationMeta={createPaginationMeta(allPromoTypesData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListPromoTypes({
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListPromoTypes({
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          getListPromoTypes({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormModal
            ref={formModalRef}
            formConfig={promoTypeFormConfig}
            drawerTitle="روش آشنایی با موسسه"
            formMode={formMode}
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
