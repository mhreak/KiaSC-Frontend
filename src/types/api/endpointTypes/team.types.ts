import { BaseParams } from "../commonApiTypes";

export interface Team {
  TeamId: number;
  TeamName: string;
  Gender: boolean;
  SportId: number;
  SportName: string;
}

export interface TeamGetListParams extends BaseParams {
  FilterTeamName?: string;
  FilterSportId?: string;
  FilterGender?: string;
}

export interface TeamGet {
  TeamId: number;
  TeamName: string;
  Gender: boolean;
  SportId: number;
}
