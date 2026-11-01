import { BaseParams } from "../commonApiTypes";

export interface CourseRegisterOption {
  RegisterOptionId: number;
  OptionName: string;
  Amount: number;
  Active: boolean;
}
export interface CourseRegisterOptionGetListParams extends BaseParams {
  CourseId?: string;
}
export interface CourseRegisterOptionGet {
  RegisterOptionId: number;
  CourseId: number;
  OptionName: string;
  Amount: number;
  AllowPayInstallment: boolean;
  FirstInstallmentAmount: number;
  AllowUseWalletCredit: boolean;
  Descripton: string | null;
  Active: boolean;
}
