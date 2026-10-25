import { BaseParams } from "../commonApiTypes";

export interface Place {
  PlaceId: number;
  PlaceName: string;
  ManagerName: string | null;
  ContactPersonName: string | null;
  Active: boolean;
}
export interface PlaceGetListParams extends BaseParams {
  FilterPlaceName?: string;
}
