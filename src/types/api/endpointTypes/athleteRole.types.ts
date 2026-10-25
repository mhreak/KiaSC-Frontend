import { BaseParams } from "../commonApiTypes";

export interface AthleteRole {
  AthleteRoleId: number;
  AthleteRoleName: string;
  SportName: string;
}

export interface AthleteRoleGetListParams extends BaseParams {
  FilterRoleName?: string;
  FilterSportId?: string;
}
