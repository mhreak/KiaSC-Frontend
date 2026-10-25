import { BaseParams } from "../commonApiTypes";

export interface Guild {
  SenfId: number;
  SenfName: string;
  ShopCount: number;
}

export interface GuildGetListParams extends BaseParams {
  FilterSenfName?: string;
}
