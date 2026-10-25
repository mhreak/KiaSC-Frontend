import { BaseParams } from "../commonApiTypes";

export interface CourseClass {
  CourseClassId: number;
  ClassName: string;
  AthleteCount: number;
  PersonCount: number;
}

export interface CourseClasseGetListParams extends BaseParams {
  CourseId?: string;
}

export interface CourseClassGet {}
