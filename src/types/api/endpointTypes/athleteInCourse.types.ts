import { BaseParams } from "../commonApiTypes";

export interface AthleteInCourse {
  AthleteInCourseId: number;
  AthleteFullName: string;
  NationalCode: string;
  CourseName: string;
  CourseClassName: string;
  CourseRegisterAmount: number;
  FinalAmount: number;
  PaymentTypeStr: string;
  RegisterState: number;
}

export interface AthleteInCourseGetListParams extends BaseParams {
  FilterAthleteId?: string;
  FilterCourseId?: string;
  FilterCourseClassId?: string;
  FilterTermId?: string;
  FilterSportId?: string;
  FilterPaymentTypeId?: string;
  FilterDiscountCodeId?: string;
  FilterRegisterState?: string;
}

export interface AthleteInCourseGet {}
