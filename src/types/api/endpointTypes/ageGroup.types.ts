import { BaseParams } from "../commonApiTypes";

export interface AgeGroup {
  AgeGroupId: number;
  AgeGroupName: string;
  ShamsiAgeGroupStartDate: string;
  ShamsiAgeGroupEndDate: string;
}

export interface AgeGroupGetListParams extends BaseParams {
  FilterAgeGroupStartDateFrom?: string;
  FilterAgeGroupStartDateTo?: string;
  FilterAgeGroupEndDateFrom?: string;
  FilterAgeGroupEndDateTo?: string;
}
