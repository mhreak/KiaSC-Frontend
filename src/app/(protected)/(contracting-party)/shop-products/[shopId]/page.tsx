"use client";

import { FormMode } from "@/components/formBuilder/types";
import ActionItems from "@/components/shared/ActionItems";
import { FormDrawer, FormDrawerRef } from "@/components/shared/FormDrawer";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  currencyFormatter,
  numberFormatter,
} from "@/components/ui/data-table/formatters";
import {
  ShopProduct,
  ShopProductGetListParams,
} from "@/types/api/endpointTypes/shopProduct";
import { ColumnDef } from "@tanstack/react-table";
import { FileChartColumn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { shopProductFormConfig } from "../shopProductFormConfig";
import { useParams } from "next/navigation";
import BackButton from "@/components/shared/BackButton";
import { useApi } from "@/hooks/useApi";
import { APIGetTemplate } from "@/types/api/commonApiTypes";
import { shopProductApi } from "@/api/services/ApiService/shopProductApi";
import { createPaginationMeta } from "@/utils/utillityFunctions";
import { FilterRenderer } from "@/components/filterFormBuilder/filter-renderer";
import { shopProductFilterConfig } from "../shopProductFilterConfig";

export default function ShopProductPage() {
  const { shopId } = useParams<{ shopId: string }>();

  const formDrawerRef = useRef<FormDrawerRef>(null);

  const [formMode, setFormMode] = useState<FormMode>("add");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [filterItems, setFilterItems] = useState<ShopProductGetListParams>({});

  const {
    data: allShopProductsData,
    isLoading: getListLoading,
    execute: getListShopProducts,
  } = useApi<APIGetTemplate<ShopProduct[]>, ShopProductGetListParams>(
    shopProductApi.getList,
  );

  useEffect(() => {
    getListShopProducts({ FilterShopId: shopId });
  }, []);

  const shopProductColumns: ColumnDef<ShopProduct>[] = [
    {
      accessorKey: "name",
      header: "نام محصول",
    },
    {
      accessorKey: "shopName",
      header: "فروشگاه",
    },
    {
      accessorKey: "price",
      header: "قیمت",
      meta: {
        formatter: currencyFormatter,
      },
    },
    {
      accessorKey: "discountPercent",
      header: "درصد تخفیف محصول",
      meta: {
        formatter: numberFormatter,
      },
    },
    {
      accessorKey: "statusStr",
      header: "وضعیت",
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
          onDelete={() => {}}
        />
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <DataTable
        columns={shopProductColumns}
        data={allShopProductsData?.Items ?? []}
        mode="filter"
        paginationMeta={createPaginationMeta(allShopProductsData)}
        isLoading={getListLoading}
        onPageChanged={(currentPage) => {
          setPage(currentPage);
          getListShopProducts({
            ...filterItems,
            PageNumber: currentPage,
            PageSize: pageSize,
          });
        }}
        onPageSizeChanged={(currentPageSize) => {
          setPageSize(currentPageSize);
          setPage(1);
          getListShopProducts({
            ...filterItems,
            PageNumber: 1,
            PageSize: currentPageSize,
          });
        }}
        onRefresh={() => {
          setFilterItems({});
          getListShopProducts({ PageNumber: page, PageSize: pageSize });
        }}
      />
      <div className="flex-between">
        <div className="flex flex-row items-center gap-5">
          <FormDrawer
            ref={formDrawerRef}
            formConfig={shopProductFormConfig}
            drawerTitle="محصول"
            formMode={formMode}
          />
          <Button variant={"warning"}>
            <FileChartColumn />
            دانلود فایل اکسل
          </Button>
        </div>
        <BackButton />
      </div>
    </div>
  );
}
