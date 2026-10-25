import { BaseParams } from "../commonApiTypes";

export interface Term {
  TermId: number;
  TermName: string;
  Year: number;
  SeasonNumber: number;
  SeasonName: string;
  TermStartDate: string;
  TermFinishDate: string;
}

export interface TermGetListParams extends BaseParams {
  FilterTermName?: string;
  FilterYear?: string;
  FilterSeasonNumber?: string;
}

export interface TermGet {
  TermId: number;
  TermName: string;
  Year: number;
  SeasonNumber: number;
  TermStartDate: string; // ISO date string
  ShamsiTermStartDate: string;
  TermFinishDate: string; // ISO date string
  ShamsiTermFinishDate: string;
}
