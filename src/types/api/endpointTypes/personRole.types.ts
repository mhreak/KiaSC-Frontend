import { BaseParams } from "../commonApiTypes";

export interface PersonRole {
  PersonRoleId: number;
  PersonRoleName: string;
  SportName: string;
}

export interface PersonRoleGetListParams extends BaseParams {
  FilterRoleName?: string;
  FilterSportId?: string;
}
