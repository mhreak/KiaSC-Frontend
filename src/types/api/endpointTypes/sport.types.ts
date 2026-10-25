import { BaseParams } from "../commonApiTypes";

export interface Sport {
  SportId: number;
  SportName: string;
}

export interface SportGetListParams extends BaseParams {
  FilterSportName?: string;
}

export interface SportGet {
  SportId: number;
  SportName: string;
}
