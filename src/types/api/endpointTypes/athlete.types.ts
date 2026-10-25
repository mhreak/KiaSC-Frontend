import { BaseParams } from "../commonApiTypes";

export interface Athlete {
  AthleteId: number;
  FullName: string;
  FatherName: string | null;
  Gender: boolean;
  NationalCode: string;
  Mobile: string;
  AgeGroupName: string | null;
}

export interface AthleteGetListParams extends BaseParams {
  FilterFullName?: string;
  FilterNationalCode?: string;
  FilterMobile?: string;
  FilterAgeGroupId?: number;
}

export interface AthleteGet {
  AthleteId: number;
  FirstName: string;
  LastName: string;
  FatherName: string;
  Gender: boolean;
  GenderStr: string;
  NationalCode: string;
  BirthDate: string;
  ShamsiBirthDate: string;
  PhoneNumber: string;
  PhoneNumber2: string | null;
  Mobile: string;
  ParentPhoneNumber: string | null;
  ParentMobile: string;
  Email: string | null;
  Address: string;
  IntroducingCode: string;
  IntroducingWalletChargePercent: number;
  IntroducerCode: string | null;
  IntroducerFullName: string;
  SportHistory: string | null;
  PromoTypeId: number;
  PromoTypeName: string;
  InsuranceNumber: string | null;
  InsuranceExpirationDate: string | null;
  InsuranceRenewalType: number;
  ShirtNumber: number | null;
  WalletCredit: number;
  PersonalImageFileName: string | null;
  PersonalImageURL: string | null;
  AgeGroupId: number | null;
  AgeGroupName: string;
}
