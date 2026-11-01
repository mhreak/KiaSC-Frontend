import { BaseParams } from "../commonApiTypes";

export interface CourseSession {
  CourseSessionId: number;
  CourseClassId: number;
  CourseClassName: string;
  ShamsiSessionDate: string;
  StateStr: string;
  AttendanceIsDone: boolean;
}

export interface CourseSessionGetListParams extends BaseParams {
  FilterCourseId?: string;
  FilterCourseClassId?: string;
  FilterSessionDateFrom?: string;
  FilterSessionDateTo?: string;
  FilterSessionState?: string;
}

export interface CourseSessionGet {
  CourseSessionId: number;
  CourseClassId: number;
  CourseClassName: string;
  ShamsiSessionDate: string;
  StateStr: string;
  AttendanceIsDone: boolean;
}
