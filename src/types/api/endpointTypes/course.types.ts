import { BaseParams } from "../commonApiTypes";

export interface Course {
  CourseId: number;
  CourseName: string;
  SportName: string;
  TermName: string;
  Gender: boolean;
}

export interface CourseGetListParams extends BaseParams {
  FilterCourseName?: string;
  FilterTermId?: string;
  FilterSportId?: string;
  FilterPlaceId?: string;
  FilterGender?: string;
}

export interface CourseGet {
  CourseId: number;
  CourseName: string;
  SportId: number;
  SportName: string;
  TermId: number;
  TermName: string;
  Gender: boolean;
  PlaceId: number | null;
  PlaceName: string | null;
  SubPlaceId: number | null;
  SubPlaceName: string | null;
  RegisterStartDate: string; // ISO date string
  ShamsiRegisterStartDate: string;
  RegisterEndDate: string; // ISO date string
  ShamsiRegisterEndDate: string;
  RegisterCapacity: number;
  RegisterAmount: number;
  SendAbsentSMS: boolean;
  AbsentSMSMaxAge: number;
  CourseStartDate: string; // ISO date string
  ShamsiCourseStartDate: string;
  CourseEndDate: string; // ISO date string
  ShamsiCourseEndDate: string;
  AllowCashPay: boolean;
  AllowOnlinePay: boolean;
  AllowPayWithCheque: boolean;
  AllowPayInstallment: boolean;
  AllowDiscountCodeForInstallmentPay: boolean;
  AllowDiscountCodeForCashPay: boolean;
  AllowDiscountCodeForOnlinePay: boolean;
  AllowDiscountCodeForPayWithCheque: boolean;
  FirstInstallmentAmount: number;
  AllowUseWalletCredit: boolean;
  AllowRegister: boolean;
  HasTermsAndConditions: boolean;
  TermsAndConditions: string;
  ActivityEvaluationTemplateId: number | null;
  ActivityEvaluationTemplateName: string;
  HasReportCard: boolean;
  ReportCardStartDate: string; // ISO date string
  ShamsiReportCardStartDate: string;
  ReportCardEndDate: string; // ISO date string
  ShamsiReportCardEndDate: string;
}
