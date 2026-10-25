import { BaseParams } from "../commonApiTypes";

export interface Person {
  PersonId: number;
  FullName: string;
  Mobile: string;
  Gender: boolean;
}

export interface PersonGetListParams extends BaseParams {
  FilterFullName?: string;
  FilterNationalCode?: string;
  FilterMobile?: string;
  FilterGender?: string;
}
