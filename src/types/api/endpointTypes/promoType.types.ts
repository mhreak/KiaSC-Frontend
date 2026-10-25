import { BaseParams } from "../commonApiTypes";

export interface PromoType {
  PromoTypeId: number;
  PromoTypeName: string;
  Active: boolean;
  AthleteCount: number;
}

export interface PromoTypeGetListParams extends BaseParams {}
