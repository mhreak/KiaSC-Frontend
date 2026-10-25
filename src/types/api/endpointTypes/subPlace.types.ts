import { BaseParams } from "../commonApiTypes";

export interface SubPlace {
  SubPlaceId: number;
  SubPlaceName: string;
  Roofed: boolean;
  Active: boolean;
}

export interface SubPlaceGetListParams extends BaseParams {}
