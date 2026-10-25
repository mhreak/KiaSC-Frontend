import { BaseParams } from "../commonApiTypes";

export interface Shop {
  ShopId: number;
  ShopName: string;
  SenfName: string;
  ManagerName: string;
  ProductCount: number;
  Active: boolean;
}

export interface ShopGetListParams extends BaseParams {
  FilterShopName?: string;
  FilterPhoneNumberOrMobile?: string;
  FilterSenfId?: string;
  FilterActive?: string;
}

export interface ShopGet {
  ShopId: number;
  ShopName: string;
  SenfId: number;
  SenfName: string | null;
  DiscountPercent: number;
  ManagerName: string;
  PhoneNumber: string;
  Mobile: string;
  Address: string;
  Image1Name: string | null;
  Image1URL: string | null;
  Image2Name: string | null;
  Image2URL: string | null;
  Image3Name: string | null;
  Image3URL: string | null;
  Image4Name: string | null;
  Image4URL: string | null;
  Image5Name: string | null;
  Image5URL: string | null;
  Active: boolean;
}
