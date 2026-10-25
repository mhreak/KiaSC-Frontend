"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { numberFormatter } from "@/components/ui/data-table/formatters";
import {
  Shop,
  ShopGet,
  ShopGetListParams,
} from "@/types/api/endpointTypes/shop.types";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import React, { useEffect, useRef, useState } from "react";
import { shopFormConfig } from "./shopFormConfig";
import { useApi } from "@/hooks/useApi";
import {
  APIAddTemplateResponse,
  APIGetTemplate,
} from "@/types/api/commonApiTypes";
import {
  createPaginationMeta,
  generateFilterConfig,
  generateFormConfig,
  toFieldOptions,
} from "@/utils/utillityFunctions";
import { shopApi } from "@/api/services/ApiService/shopApi";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { shopFilterConfig } from "./shopFilterConfig";
import {
  Guild,
  GuildGetListParams,
} from "@/types/api/endpointTypes/guild.types";
import { guildApi } from "@/api/services/ApiService/guildApi";
import { toast } from "@/lib/toast/toast";

export default function ShopsPage() {
  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<ShopGetListParams>({});

  const router = useTransitionRouter();

  const {
    data: allShopsData,
    isLoading: getListLoading,
    execute: getListShops,
  } = useApi<APIGetTemplate<Shop[]>, ShopGetListParams>(shopApi.getList);

  const {
    data: shopData,
    isLoading: getLoading,
    execute: getShop,
  } = useApi<ShopGet, { id: number }>(shopApi.get);

  const { isLoading: addLoading, execute: addShop } = useApi<
    APIAddTemplateResponse<number>,
    any
  >(shopApi.add, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formDrawerRef.current?.close();
      getListShops({
        ...filterItems,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { isLoading: editLoading, execute: editShop } = useApi<
    APIAddTemplateResponse,
    any
  >(shopApi.edit, {
    onSuccess(response) {
      toast.success(response.MessageList[0] || "");
      formDrawerRef.current?.close();
      getListShops({
        ...filterItems,
        PageNumber: page,
        PageSize: pageSize,
      });
    },
  });

  const { data: allGuildsData, execute: getListGuilds } = useApi<
    APIGetTemplate<Guild[]>,
    GuildGetListParams
  >(guildApi.getList);

  const isSubmitting = addLoading || editLoading;

  useEffect(() => {
    getListShops();
    getListGuilds();
  }, []);

  const shopColumns: ColumnDef<Shop>[] = [
    {
      accessorKey: "ShopName",
      header: "نام فروشگاه",
    },
    {
      accessorKey: "SenfName",
      header: "صنف",
    },
    {
      accessorKey: "ProductCount",
      header: "تعداد محصولات",
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
            getShop({ id: row.original.ShopId });
            formDrawerRef.current?.open();
          }}
          otherActions={[
            {
              onClick: () => {
                router.push(
                  `/shop-products/${row.original.ShopId}?name=${encodeURIComponent(`لیست محصولات فروشگاه ${row.original.ShopName}`)}`,
                );
              },
              label: "مشاهده محصولات",
            },
          ]}
        />
      ),
    },
  ];

  const formConfig = generateFormConfig(shopFormConfig, {
    values: formMode === "edit" ? shopData || undefined : undefined,
    options: {
      SenfId: toFieldOptions(allGuildsData?.Items ?? [], "SenfName", "SenfId"),
    },
  });

  const filterConfig = generateFilterConfig(shopFilterConfig, {
    options: {
      FilterSenfId: toFieldOptions(
        allGuildsData?.Items ?? [],
        "SenfName",
        "SenfId",
      ),
    },
  });

  return (
    <div className="space-y-5">
      <FilterRenderer
        config={filterConfig}
        onApplyFilters={(filterData) => {
          setFilterItems(filterData);
          setPage(1);
          getListShops({
            ...filterData,
            PageNumber: 1,
            PageSize: pageSize,
          });
        }}
      />
      <DataTable
        columns={shopColumns}
        data={allShopsData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allShopsData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListShops({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListShops({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListShops({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={formConfig}
            onSubmit={(data) => {
              let imagesObject: Record<string, File> = {};
              data.images.forEach((image: File, i: number) => {
                imagesObject[`image${i + 1}`] = image;
              });
              if (formMode === "add") {
                addShop({ ...data, ...imagesObject, images: undefined });
              } else if (formMode === "edit") {
                editShop({
                  ...data,
                  ...imagesObject,
                  ShopId: shopData?.ShopId,
                  images: undefined,
                });
              }
            }}
            drawerTitle="فروشگاه"
            formMode={formMode}
            isLoading={getLoading}
            isSubmitting={isSubmitting}
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
