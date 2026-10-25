import { BaseParams } from "../commonApiTypes";

export interface Discount {
  id: string;
  name: string;
  code: string;
  type: "byPrice" | "byPercentage" | "custom";
}

export interface DiscountReport {
  id: string;
  athlete: string;
  course: string;
  status: "removed" | "submitting" | "submitted";
  discountAmount: number;
  finalPrice: number;
}

export interface DiscountGetListParams extends BaseParams {
  FilterDiscountCodeType?: string;
  FilterExpirationDateFrom?: string;
  FilterExpirationDateTo?: string;
  FilterActive?: string;
}
