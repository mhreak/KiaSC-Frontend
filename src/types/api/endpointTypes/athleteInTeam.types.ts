import { BaseParams } from "../commonApiTypes";

export interface AthleteInTeam {
  AthleteId: number;
  AthleteFullName: string | null;
  TeamId: number;
  TeamName: string | null;
  AthleteRoleId: number;
  AthleteRoleName: string;
}

export interface AthleteInTeamGetListParams extends BaseParams {
  FilterTeamId?: string;
  FilterAthleteId?: string;
  FilterAthleteRoleId?: string;
}

export interface AthleteInTeamGet {}
