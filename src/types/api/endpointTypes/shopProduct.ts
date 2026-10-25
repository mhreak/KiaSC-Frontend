import { BaseParams } from "../commonApiTypes";

export interface ShopProduct {
  id: string;
  name: string;
  shopName: string;
  price: number;
  discountPercent: number;
  status: boolean;
  statusStr: string;
}

export interface ShopProductGetListParams extends BaseParams {
  FilterProductName?: string;
  FilterShopId?: string;
  FilterActive?: string;
}
