import { BaseParams } from "../commonApiTypes";

export interface Installment {
  id: string;
  athlete: string;
  course: string;
  term: string;
  installmentAmount: number;
  dueDate: string;
  status: "settled" | "unsettled" | "deleted";
  settlementDate: string;
}

export interface InstallmentGetListParams extends BaseParams {
  FilterTermId?: string;
  FilterCourseId?: string;
  FilterAthleteId?: string;
  FilterState?: string;
  FilterAmountFrom?: string;
  FilterAmountTo?: string;
  FilterInstallmentDateFrom?: string;
  FilterInstallmentDateTo?: string;
  FilterPayDateFrom?: string;
  FilterPayDateTo?: string;
}

export interface InstallmentGet {}

export interface InstallmentItem {
  id: string;
  for: string;
  price: number;
}

export interface OnlineTransaction {
  id: string;
  athleteName: string;
  course: string;
  price: number;
  status: "success" | "failed";
  date: string;
  trackingNumber: number;
  description: string;
}
