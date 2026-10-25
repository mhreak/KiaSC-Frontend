import { BaseParams } from "../commonApiTypes";

export interface Birthday {
  AthleteId: number;
  AthleteFullName: string;
  Mobile: string;
  ShamsiBirthDate: string;
  BirthDayGiftName: string;
}

export interface BirthdayGetListParams extends BaseParams {
  AthleteId?: string;
  BirthdayMonth?: string;
  BirthdayDayOfMonth?: string;
  BirthdayGiftId?: string;
}

export interface Gift {
  GiftId: number;
  GiftName: string;
  Amount: number;
  Active: boolean;
}

export interface GiftGetListParams extends BaseParams {
  FilterGiftName?: string;
  FilterActive?: string;
}
